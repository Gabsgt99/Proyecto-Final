import express from "express";
import {registerController, loginController, testController, sendPasswordLink, forgotPassword, newPassword } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { createBookingController } from "../controllers/bookingController.js";

//router object
const router = express.Router()

//routing
// REGISTER || METHOD POST
router.post('/register', registerController);

//CONFIRM-CREATE PASSWORD || METHOD POST
//router.post('/confirm', passController);

//LOGIN || POST
router.post('/login', loginController);

//BOOKINGS || POST
router.post('/booking', createBookingController);

//Test Routes || GET
router.get('/test', requireSignIn, isAdmin, testController);

// SEND RESET PASSWORD LINK || POST & GET
router.post("sendpasswordlink", sendPasswordLink);

router.get("/forgotpassword/:id/:token", forgotPassword);

//NEW PASSWORD || POST
router.post("/:id/:token", newPassword);

export default router;