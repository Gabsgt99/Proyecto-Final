import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
            type:String,
            required:true,
            trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not valid email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
    role:{
        type:Boolean,
        default:false
    },
    tokens:[
        {   
            token:{
                type:String,
                required:true
            }
        }
    ],
    verifytoken:{
        type: String
    },
    status:{
        type:String,
        required:true,
        default:'UNVERIFIED'
    }
},{timestamps:true});

export default mongoose.model('Users', userSchema);