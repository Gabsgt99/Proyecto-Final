import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    capacity:{
        type:String,
        required:true
    },
    photo: {
        data: Buffer,
        contentType: String,
      }
},{timestamps:true});

export default mongoose.model('Rooms', roomSchema);