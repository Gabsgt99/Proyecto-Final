import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {roomController,createRoomController, deleteRoomController, singleRoomController,updateRoomController,
} from "../controllers/roomController.js";

const router = express.Router();

//routes
// create rooms
router.post(
  "/create-room",
  /*requireSignIn,
  isAdmin,*/
  createRoomController
);

//update room
router.put(
  "/update-room/:id",
  requireSignIn,
  isAdmin,
  updateRoomController
);

//getAll rooms
router.get("/get-rooms", roomController);

//single room
router.get("/single-room/:slug", singleRoomController);

//delete room
router.delete(
  "/delete-room/:id",
  requireSignIn,
  isAdmin,
  deleteRoomController
);

export default router;