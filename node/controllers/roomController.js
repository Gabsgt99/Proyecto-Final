import roomModel from "../models/roomModel.js";
import slugify from "slugify";
import fs from "fs";

export const createRoomController = async (req, res) => {
    try {
      const { name, description, capacity} =
        req.fields;
      const { photo } = req.files;
      //Validation
      /* switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !capacity:
          return res.status(500).send({ error: "Capacity is Required" });
        case photo && photo.size > 10000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 10mb" });
      } */
  
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
    await roomModel.findByIdAndDelete(req.params.pid).select("-photo");
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

//update rooms
export const updateRoomController = async (req, res) => {
  try {
    const { name, description, capacity } =
      req.fields;
    const { photo } = req.files;
    //Validation
    /*switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }*/

    const rooms = await roomModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      rooms.photo.data = fs.readFileSync(photo.path);
      rooms.photo.contentType = photo.type;
    }
    await rooms.save();
    res.status(201).send({
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


