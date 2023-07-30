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
    admin:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true});

export default mongoose.model('Users', userSchema);