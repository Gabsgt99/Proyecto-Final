import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/bd.js';
import authRoute from './routes/authRoute.js';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoute);

// rest api
app.get('/', (req,res) =>{
    res.send("<h1>Bienvenido al gestor de salas</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}`);
});