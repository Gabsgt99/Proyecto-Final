import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getToken, getTokenData } from "../config/jwt.config.js";
import { sendEmail, getTemplate } from "../config/mail.config.js";
import bcrypt from "bcrypt"

export const registerController = async(req,res) => {
    try {
        const {name,email,admin} = req.body;
        //Validation
        if(!name || !email){
            return res.send({error:'Rellene todos los campos'});
        }
        
        //check user
        const existingUser = await userModel.findOne({ email });
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Usuario ya registrado'
            });
        }

        //Generates provisional password
        const password = uuidv4();
        
        //Generate token for mail confirmation
        const token = getToken(req.body);

        //save
        const user = await new userModel({name,email,admin,password,token}).save();
        
        //Get a template
        const template = getTemplate(user);
        
        //Send email
        await sendEmail(email,"Bienvenido a Factoria F5", template);

        res.status(201).send({
            success:true,
            message:'Usuario registrado con exito',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error en el registro',
            error,
        });
    }
};


// * LOGIN || POST*
export const loginController = async(req,res) => {
    try {
        const {email,password} = req.body;
        //VALIDATION 
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Email o password invalidos'
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email no registrado'
            });
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Contraseña invalida',
            });
        }
        //token
        const token = JWT.sign({ _id:user._id}, process.env.JWT_SECRET, {
            expiresIn:"30d",
        });
        res.status(201).send({
            success:true,
            message:'Te has logueado',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                isadmin:user.admin
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error en el login',
            error,
        });
    }
};

//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
    
};

//EMAIL CONFIG
//Send email for reset password
export const sendPasswordLink = async(req,res) => {
    console.log(req.body);
    const {email} = req.body;
    console.log(email);
    if(!email){
        res.status(401).json({status:401,message:"Escriba su correo"})
    }

    try {
        const user = await userModel.findOne({email:email});
        if( user !== null ){
            // token generate for reset password
            const token = JWT.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:"48h"
            });
            const setusertoken = await userModel.findByIdAndUpdate({_id:user._id},{token:user.token},{new:true});
            if(setusertoken){
                const mailOptions = {
                    to: email,
                    subject:"Enlace para resetear la contraseña, FactoriaF5",
                    text:`Este enlace sólo sera valido durante 48 horas http://localhost:3000/forgotpassword?id=${user.id}&&token=${user.token}`
                }
                sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text);
                res.status(201).json({status:201,message:"Se ha enviado un email para recuperar contraseña"})
            }
        }else{
            res.status(204).json({status:204,message:"Usuario no valido"});
        }
    } catch (error) {
        console.clear();
        console.log(error);
        res.status(401).json({status:401,message:error})
    }
};

// verify user for forgot password 
export const forgotPassword = async(req,res)=>{
    const {id,token} = req.query;
    try {
        const validuser = await userModel.findOne({token:token});
        
        const verifyToken = JWT.verify(token, process.env.JWT_SECRET);
        if(validuser !== null && verifyToken !== null){
            res.status(200).json({status:200, "id" : verifyToken.data.email });
        }else{
            res.status(204).json({status:401,message:"Usuario no existe"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
};

// change password
export const newPassword = async(req,res)=>{
    const {id,token, password} = req.body;
    try {
        const validuser = await userModel.findOne({_id:id,token:token});
        const verifyToken = JWT.verify(token,process.env.JWT_SECRET,);
        if(validuser !== null && verifyToken !== null){
            const newpassword = await bcrypt.hash(password,12);
            const setnewuserpass = await userModel.findByIdAndUpdate({_id:id},{password:newpassword, verified:true });
            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass});
        }else{
            res.status(401).json({status:401,message:"Usuario no existe"});
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({status:401,error});
    }
};