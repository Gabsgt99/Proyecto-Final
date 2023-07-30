import roomModel from "../models/roomModel.js";
import slugify from "slugify";
import fs from "fs";

export const createRoomController = async (req, res) => {
    try {
      const { name, description, capacity} =
        req.fields;
      const { photo } = req.files;
      //Validation
      if (!name || !description || !capacity || !photo ) {
            res.status(500)
            .send({ error: "All fields must be filled and photo should be less then 10mb" });
      } 
  
      const rooms = new roomModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        rooms.photo.data = fs.readFileSync(photo.path);
        rooms.photo.contentType = photo.type;
      }
      await rooms.save();
      res.status(201).send({
        success: true,
        message: "Room Created Successfully",
        rooms,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating a room",
      });
    }
  };

//update Rooms

// get all rooms
export const roomController = async (req, res) => {
  try {
    const rooms = await roomModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: rooms.length,
      message: "All rooms ",
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting rooms",
      error: error.message,
    });
  }
};
// get single room
export const singleRoomController = async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');
    const rooms = await roomModel
      .findById({ _id: req.params.id })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single Room Fetched",
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single room",
      error,
    });
  }
};

// get photo
export const roomPhotoController = async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');
    const rooms = await roomModel.findById(req.params.pid).select("photo");
    if (rooms.photo.data) {
      res.set("Content-type", rooms.photo.contentType);
      return res.status(200).send(rooms.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteRoomController = async (req, res) => {
  try {
    await roomModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Room Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting room",
      error,
    });
  }
};

export const updateRoomController = async (req, res) => {
  try {
    const { name, description, capacity } = req.body; // Usar req.body en lugar de req.fields
    const { photo } = req.files;

    const rooms = await roomModel.findById(req.params.pid);

    rooms.name = name;
    rooms.description = description;
    rooms.capacity = capacity;
    rooms.slug = slugify(name);

    if (photo) {
      // Leer el archivo adjunto con fs
      const fileData = fs.readFileSync(photo.path);
      rooms.photo.data = fileData;
      rooms.photo.contentType = photo.type;
    }

    await rooms.save();

    res.status(200).send({
      success: true,
      message: "Room Updated Successfully",
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update room",
    });
  }
};


