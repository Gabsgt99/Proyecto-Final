import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conex = await mongoose.connect(process.env.MONGO_URL, {  useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Aumenta el tiempo de espera a 5 segundos (por ejemplo)
          });
        console.log(`Conectado a MongoDB ${conex.connection.host}`);
    } catch (error) {
        console.log(`Error en MongoDB ${error}`);
    }
};

export default connectDB;