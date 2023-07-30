import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { createRoomController, getImage } from "../controllers/roomController.js";
import multer from 'multer';
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './images'; // Ruta del directorio de destino
    fs.mkdirSync(uploadDir, { recursive: true }); // Crea el directorio si no existe
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const uploads = multer({ storage });

// create rooms
router.post(
  "/create/room",
  // requireSignIn,
  // isAdmin,
  uploads.single("file"),
  createRoomController
);

router.get("/images/:file", getImage);

// Rest of the code remains the same...


//update room
/*router.put(
  "/update-room/:id",
  requireSignIn,
  isAdmin,
  //formidable(),
  updateRoomController
);

getAll rooms
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