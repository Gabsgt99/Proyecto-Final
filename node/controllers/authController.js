import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

const registerController = async(req,res) => {
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


export default registerController;