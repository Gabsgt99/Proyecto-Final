import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/bd.js';
import authRoute from './routes/authRoute.js';
import roomRoute from './routes/roomRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import cors from 'cors';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
//app.use(cors(corsOptions));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/rooms", roomRoute);
app.use("/api/v1/bookings", bookingRoute);

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