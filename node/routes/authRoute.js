import express from "express";
import {registerController, loginController, testController, passController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { createBookingController } from "../controllers/bookingController.js";

//router object
const router = express.Router()

//routing
// REGISTER || METHOD POST
router.post('/register', registerController);

//CONFIRM-CREATE PASSWORD || METHOD POST

router.post('/confirm', passController);

//LOGIN || POST
router.post('/login', loginController);

//BOOKINGS || POST
router.post('/booking', createBookingController);

//Test Routes
router.get('/test', requireSignIn, isAdmin, testController);

export default router;