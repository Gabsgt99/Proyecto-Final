import express from "express";
import {registerController, loginController, testController, sendPasswordLink, forgotPassword, newPassword } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { createBookingController } from "../controllers/bookingController.js";

//router object
const router = express.Router()

// ROUTING WITHOUT AUTH.

//Login || POST
router.post('/login', loginController);

//Forgot password || POST
router.get("/forgotpassword", forgotPassword);

// SEND RESET PASSWORD LINK || POST & GET
router.post("/sendpasswordlink", sendPasswordLink);

//NEW PASSWORD || POST
router.post("/newPassword", newPassword);

// ROUTING WITH AUTH.

// Register || POST
router.post('/register', requireSignIn, isAdmin, registerController);

//Protected User route auth || GET
router.get('/user-auth', requireSignIn, (req,res) => { res.status(200).send({ok:true}) });

//Protected Admin route auth || GET
router.get('/admin-auth', requireSignIn,isAdmin, (req,res) => { res.status(200).send({ok:true}) });

// ROUTING FOR TESTING

//Test Routes || GET
router.get('/test', requireSignIn, isAdmin, testController);

export default router;