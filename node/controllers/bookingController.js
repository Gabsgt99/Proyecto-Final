import bookingModel from "../models/bookingModel.js";
import mongoose from "mongoose";



export const createBookingController = async (req,res) => {
    try {
        console.log(req.body);
        const {userId, roomId, startDate, endDate} = req.body;
        if(!startDate) {
            return res.status(401).send({ message: "Seleccione la hora de inicio" });
        }
        if(!endDate) {
            return res.status(401).send({ message: "Seleccione la hora de finalización" });
        }
        const compareEvent = {
          room:  new mongoose.Types.ObjectId(roomId),
            $or: [
                {start_date: { $lte: startDate }, end_date: { $gte: startDate } },
                {start_date: { $lte: endDate }, end_date: { $gte: endDate } },
                {start_date: { $gte: startDate }, end_date: { $lte: endDate } }
            ]
        };
        const existingEvent = await bookingModel.countDocuments(compareEvent);
        console.log(existingEvent);
        console.log("===========================================");
        if (existingEvent > 0) {
            return res.status(200).send({
                success: false,
                message: "Ya existe una reserva a esa hora",
            });
        }
        const booking = await new bookingModel({
            user: userId,
            room: roomId,
            start_date: startDate,
            end_date: endDate,
        }).save();
        res.status(201).send({
        success: true,
        message: "Has hecho una reserva",
        booking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error al hacer la reserva",
        });
    }
};




/* export const createBookingController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Escriba un nombre" });
    }
    const existingRoom = await roomModel.findOne({ name });
    if (existingRoom) {
      return res.status(200).send({
        success: false,
        message: "Ya existe una sala con ese nombre",
      });
    }
    const room = await new roomModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Ha creado una nueva sala",
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al crear una sala",
    });
  }
}; */

//update Bookings
export const updateBookingController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const booking = await bookingModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Se ha actualizado la sala",
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al actualizar la sala",
    });
  }
};

// get all bookings ==================================================================
export const bookingController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al consultar las salas",
    });
  }
};

// single booking ==================================================================================
export const oneBookingController = async (req, res) => {
  try {
    const room = await roomModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Consulta de reserva exitosa",
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al consultar la reserva",
    });
  }
};


// Obtener todas las reservas de una sala específica
export const getBookingsByRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    console.log(roomId);
    
    // Buscar todas las reservas de la sala específica en la base de datos
    const bookings = await bookingModel.find({ room: roomId });
    console.log(bookings);
    res.status(200).json({ 
      success: true, 
      bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener las reservas' });
  }
};



/* export const getBookingsByUser = async (req, res) => {
  try {
    const userId = "64a68b590e95b932adb3b733";
    
    
    // Buscar todas las reservas de la sala específica en la base de datos
    const bookings = await bookingModel.find({ user: userId });
    console.log(bookings);
    res.status(200).json({ 
      success: true, 
      bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener las reservas' });
  }
};

 */



export const getBookingsByUser = async (req, res) => {
  try {
    const userId = "64a68b590e95b932adb3b733";
    
    // Hacer una doble población para obtener los datos completos de usuario y sala en una sola consulta
    const bookings = await bookingModel.find({ user: userId })
      .populate({
        path: 'user',
        select: 'name' // Filtrar y obtener solo el campo 'name' del usuario
      })
      .populate({
        path: 'room',
        select: 'name' // Filtrar y obtener solo el campo 'name' de la sala
      });

    // Modificar cada objeto de reserva para eliminar el campo 'userId'
    const formattedBookings = bookings.map(booking => {
      const { _id, user, room, start_date, end_date, createdAt, updatedAt, __v } = booking;
      return {
        _id,
        user: user.name, // Acceder al campo 'name' del usuario
        room,
        start_date,
        end_date,
        createdAt,
        updatedAt,
        __v
      };
    });

    res.status(200).json({ 
      success: true, 
      bookings: formattedBookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener las reservas' 
    });
  }
};

//aqui no se accede al token, con el middleware se comprueba el admin
export const getAllBookings = async (req, res) => {
  try {
    
    // Hacer una doble población para obtener los datos completos de usuario y sala en una sola consulta
    const bookings = await bookingModel.find()
      .populate({
        path: 'user',
        select: 'name' // Filtrar y obtener solo el campo 'name' del usuario
      })
      .populate({
        path: 'room',
        select: 'name' // Filtrar y obtener solo el campo 'name' de la sala
      });

    // Modificar cada objeto de reserva para eliminar el campo 'userId'
    const formattedBookings = bookings.map(booking => {
      const { _id, user, room, start_date, end_date, createdAt, updatedAt, __v } = booking;
      return {
        _id,
        user: user.name, // Acceder al campo 'name' del usuario
        room,
        start_date,
        end_date,
        createdAt,
        updatedAt,
        __v
      };
    });

    res.status(200).json({ 
      success: true, 
      bookings: formattedBookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener las reservas' 
    });
  }
};


//delete booking ============================================================
export const deleteBookingController = async (req, res) => {
  try {
    const { id } = req.params;
    await bookingModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Sala eliminada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al eliminar la sala",
      error,
    });
  }
};
