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

//routes
// create booking
router.post(
  "/create-booking",
  //requireSignIn,
  //isAdmin,
  createBookingController
);

//update booking
router.put(
  "/update-booking/:id",
  requireSignIn,
  isAdmin,
  updateBookingController
);

//get all bookings
router.get("/get-bookings", bookingController);

//single booking
router.get("/one-booking/:id", oneBookingController);

//delete booking
router.delete(
  "/delete-booking/:id",
  requireSignIn,
  isAdmin,
  deleteBookingController
);

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

