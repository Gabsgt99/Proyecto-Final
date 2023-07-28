import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getToken, getTokenData } from "../config/jwt.config.js";
import { sendEmail, getTemplate } from "../config/mail.config.js";

export const registerController = async(req,res) => {
    try {
        const {name,email,admin} = req.body;
        //Validation
        if(!name){
            return res.send({error:'Escriba un nombre'});
        }

        if(!email){
            return res.send({error:'Escriba un email'});
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
        const password = uuidv4();
        //Generate token for mail confirmation
        //console.log(email,password);
        const token = getToken({email,password});
        //Get a template
        const template = getTemplate(name,token);
        //Send email
        await sendEmail(email,template);
        
        //save
        const user = await new userModel({name,email,admin,password,token}).save();
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

//Validate user
/* const confirm = async (req, res) => {
    try {

       // Get token
       const { token } = req.params;
       
       // Check data
       const data = await getTokenData(token);

       if(!data) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
       }

       console.log(data);

       const { email, code } = data.data;

       // Check existing user
       const user = await userModel.findOne({ email });

       if(!user) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
       }

       
       //Update status
       user.status = 'VERIFIED';
       await user.save();


      // return res.redirect('/confirm.html');

      //****BUSCAR A DONDE VA DESPUES DE CONFIRMAR*****
        
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
}; */

//Validated user create a password
/* export const passController = async (req,res) => {
    try {
        const password = req.body;
        if(!password){
            return res.send({error:'Escriba una contraseña'});
        }
    const hashedPassword = await hashPassword(password);
 //save
    const user = await new userModel({password:hashedPassword}).save();
        res.status(201).send({
            success:true,
            message:'Password registrado con exito',
            user,
        });
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error en el registro del password',
            error,
        });
    }
}; */


// * LOGIN || POST*
export const loginController = async(req,res) => {
    try {
        const {email,password} = req.body;
        //VALIDATION ********************************
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
        const token = await JWT.sign({ _id:user._id}, process.env.JWT_SECRET, {
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
    if(!email){
        res.status(401).json({status:401,message:"Escriba su correo"})
    }

    try {
        const user = await userModel.findOne({email:email});

        // token generate for reset password
        const token = JWT.sign({_id:user._id},keysecret,{
            expiresIn:"24h"
        });
        
        const setusertoken = await userModel.findByIdAndUpdate({_id:user._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:process.env.FROM_EMAIL,
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 24 hours http://localhost:3000/forgotpassword/${user.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email no enviado"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email enviado exitosamente"})
                }
            });
        }
    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }
};


// verify user for forgot password time
export const forgotPassword = async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await userModel.findOne({_id:id,verifytoken:token});
        
        const verifyToken = JWT.verify(token,keysecret);

        console.log(verifyToken);

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"Usuario no existe"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
};

// change password

export const newPassword = async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userModel.findOne({_id:id,verifytoken:token});
        
        const verifyToken = JWT.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await userModel.findByIdAndUpdate({_id:id},{password:newpassword });//<===Solucionar status Verified
            //user.status = 'VERIFIED';
            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"Usuario no existe"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
};