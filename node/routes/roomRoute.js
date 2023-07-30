import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  roomController,
  createRoomController,
  deleteRoomController,
  singleRoomController,
  updateRoomController,
  roomPhotoController,
} from "../controllers/roomController.js";
import formidable from 'express-formidable';

const router = express.Router();

// ROUTING WITH AUTH.

// create rooms || POST
router.post( "/create-room", requireSignIn, isAdmin, formidable(), createRoomController );

//update room || PUT
router.put( "/update-room/:id", requireSignIn, isAdmin, updateRoomController);

//getAll rooms || GET
router.get("/get-rooms", requireSignIn, roomController);

//single room || GET
router.get("/:id", requireSignIn, singleRoomController);

//delete room || DELETE
router.delete( "/delete-room/:id", requireSignIn, deleteRoomController);

// ROUTING WITHOUT AUTH.

//get photo || GET
router.get("/room-photo/:pid", roomPhotoController);

// ROUTING FOR TESTING

export default router;