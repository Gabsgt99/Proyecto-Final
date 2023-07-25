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
      message: "Error al consultar la sala",
    });
  }
};

//delete booking ============================================================
export const deleteBookingController = async (req, res) => {
  try {
    const { id } = req.params;
    await roomModel.findByIdAndDelete(id);
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
