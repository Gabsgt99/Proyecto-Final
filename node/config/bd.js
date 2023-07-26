import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conex = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conectado a MongoDB ${conex.connection.host}`);
    } catch (error) {
        console.log(`Error en MongoDB ${error}`);
    }
};

export default connectDB;