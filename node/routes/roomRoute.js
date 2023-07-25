import express from "express";
//import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
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

//routes
// create rooms
router.post(
  "/create-room",
  //requireSignIn,
  //isAdmin,
  formidable(),
  createRoomController
);

//update room
router.put(
  "/update-room/:id",
  //requireSignIn,
  //isAdmin,
  updateRoomController
);

//getAll rooms
router.get("/get-rooms", roomController);

//single room
router.get("/:id", singleRoomController);

//get photo
router.get("/room-photo/:pid", roomPhotoController);

//delete room
router.delete(
  "/delete-room/:id",
  //requireSignIn,
  //isAdmin,
  deleteRoomController
);

export default router;