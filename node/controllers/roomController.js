import roomModel from "../models/roomModel.js";
import slugify from "slugify";
import fs from "fs";

export const createRoomController = async (req, res) => {
  try {
    //const { fields, files } = req;
    
//if (!fields) {
     // return res.status(500).send({ error: "Se requiere nombre de la sala" });
    //}
    
    const { name, capacity, description } = req.body;
    //const { photo } = files;
    
    // Validación adicional
    //if (photo && photo.size > 1000000) {
      //return res.status(500).send({ error: "La foto es requerida y debe ser menor a 1 MB" });
    //}
    
    //const slug = slugify(name);
    //const room = new roomModel({ name, capacity, description, slug });
    const room = new roomModel({ name, capacity, description});
    
    ////room.photo.data = fs.readFileSync(photo.path);
      //room.photo.contentType = photo.type;
    //}
    
    const savedRoom = await room.save();

    res.json(savedRoom)
    
    /*res.status(201).send({
      success: true,
      message: "La sala ha sido creada satisfactoriamente",
      room,
    });*/
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al crear la sala",
    });
  }
};

//update room
export const updateRoomController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await roomController.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Sala actualizada con éxito",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al actualizar sala",
    });
  }
};

// get all room
export const roomController = async (req, res) => {
  try {
    const category = await roomModel.find({});
    res.status(200).send({
      success: true,
      message: "Lista de salas",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al obtener todas las salas",
    });
  }
};

// single room
export const singleRoomController = async (req, res) => {
  try {
    const room = await roomModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Obtuviste una sala con éxito",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al obtener una sala con éxito",
    });
  }
};

//delete room
export const deleteRoomController = async (req, res) => {
  try {
    const { id } = req.params;
    await roomModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Sala eliminada con éxito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error al eliminar sala",
      error,
    });
  }
};