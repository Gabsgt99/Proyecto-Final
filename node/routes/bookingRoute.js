import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  bookingController,
  createBookingController,
  deleteBookingController,
  oneBookingController,
  updateBookingController,
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

export default router;