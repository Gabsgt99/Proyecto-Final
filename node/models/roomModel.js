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
      data: Buffer,
      contentType: String,
    },

},{ timestamps: true }
);

export default mongoose.model("roomModel", roomModelSchema);