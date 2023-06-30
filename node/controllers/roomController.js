import roomModel from "../models/roomModel.js";
import slugify from "slugify";
export const createRoomController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Se requiere nombre de la sala" });
    }
    const existingRoom = await roomModel.findOne({ name });
    if (existingRoom) {
      return res.status(200).send({
        success: false,
        message: "La sala ha sido creada",
      });
    }
    const room = await new roomModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Nueva sala creada",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error de sala",
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