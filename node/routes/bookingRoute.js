import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  bookingController,
  createBookingController,
  deleteBookingController,
  oneBookingController,
  updateBookingController,
  getBookingsByRoom,
  getBookingsByUser,
  getAllBookings
} from "../controllers/bookingController.js";

const router = express.Router();

// ROUTING WITH AUTH.

// create booking || POST
router.post( "/create-booking", requireSignIn, isAdmin, createBookingController);

//update booking || PUT
router.put("/update-booking/:id", requireSignIn, isAdmin, updateBookingController );

//get all bookings || GET
router.get("/get-bookings", requireSignIn, bookingController);

//single booking || GET
router.get("/one-booking/:id", requireSignIn, oneBookingController);

//delete booking || DELETE
router.delete( "/delete-booking/:id", requireSignIn, isAdmin, deleteBookingController );

//TODO: validar si es necesaria esta ruta para eliminarla o habilitarla BOOKINGS || POST
//router.post('/booking', requireSignIn, isAdmin, createBookingController);

// ROUTING WITHOUT AUTH.
// ROUTING FOR TESTING

//get all booking by id
router.get(
  '/get-bookings/:id', 
  getBookingsByRoom);

  //get all booking by user
router.get(
  '/get-bookingsbyuser', 
  getBookingsByUser);

  //get all booking by user
  router.get(
    '/get-allbookings', 
    getAllBookings);

export default router;

