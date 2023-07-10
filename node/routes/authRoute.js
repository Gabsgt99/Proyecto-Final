import express from "express";
import {registerController, loginController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { createRoomController } from "../controllers/roomController.js";
//router object
const router = express.Router()

//routing
// REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//Test Routes
router.get('/test', requireSignIn, isAdmin, testController);

//Crear Sala
router.post('/create-room', createRoomController);

export default router;