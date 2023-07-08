import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';


export const registerController = async(req,res) => {
    try {
        const {name,lastname,email,password} = req.body;
        //Validation
        if(!name){
            return res.send({error:'Escriba un nombre'});
        }
        if(!lastname){
            return res.send({error:'Escriba un apellido'});
        }
        if(!email){
            return res.send({error:'Escriba un email'});
        }
        if(!password){
            return res.send({error:'Escriba una contraseña'});
        }

        //check user
        const existingUser = await userModel.findOne({email});
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Usuario ya registrado'
            });
        }

        //Register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name,lastname,email,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:'Usuario registrado con exito',
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error en el registro',
            error
        });
    }
};
// POST LOGIN
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
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:'Te has logueado',
            user:{
                _id:user._id,
                name:user.name,
                lastname:user.lastname,
                email:user.email,
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

export default registerController;