import mongoose from "mongoose";

const roomModelSchema = new mongoose.Schema({
  
    name: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "default.png"
    },

},{ timestamps: true });

export default mongoose.model("Rooms", roomModelSchema);