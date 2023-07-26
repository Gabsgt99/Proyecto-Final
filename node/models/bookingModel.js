import { mongoose } from "mongoose";


const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms',
        required: true
    },
    start_date:{
        type: Date,
        required:true
    },
    end_date:{
        type: Date,
        required: true
    }
},{timestamps:true});

export default mongoose.model('Bookings', bookingSchema);