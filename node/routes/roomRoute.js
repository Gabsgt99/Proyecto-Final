import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {createRoomController, getImage} from "../controllers/roomController.js";
import multer from 'multer'
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },

  filename: (req, file, cb) => {
    cb(null, + Date.now() + "-" + file.originalname);
  },
});
const uploads = multer({ storage });
//routes
// create rooms
router.post("/create-room",
  /*requireSignIn,
  isAdmin,*/
  //formidable(),
  uploads.single("file"),
  createRoomController
);
router.get("/images/:file",getImage);
//update room
/*router.put(
  "/update-room/:id",
  requireSignIn,
  isAdmin,
  //formidable(),
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
);*/

export default router;