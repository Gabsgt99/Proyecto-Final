import roomModel from "../models/roomModel.js";
import slugify from "slugify";

export const createRoomController = async (req, res) => {
  try {
    const { name, capacity, description } = req.body;
    const { photo } = req.body;

    if (!name) {
      return res.status(401).send({ message: "Se requiere nombre de la sala" });
    }
    if (!capacity) {
      return res.status(401).send({ message: "Se requiere capacidad de sala" });
    }
    if (!description) {
      return res.status(401).send({ message: "Se requiere descripción de la sala" });
    }
    if (photo && photo.size > 1000000) {
      return res
        .status(401)
        .send({ error: "La foto es requerida y debe ser menor a 1 MB" });
    }
    const room = new roomModel({ name, slug: slugify(name) });
    if (photo) {
      room.photo.data = fs.readFileSync(photo.path);
      room.photo.contentType = photo.type;
    }
    
    const existingRoom = await roomModel.findOne({ name });
    if (existingRoom) {
      return res.status(200).send({
        success: false,
        message: "Una sala con ese nombre ya existe",
      });
    }
    /*const room = await new roomModel({
      name,
      slug: slugify(name,capacity,description),
    }).save();
    res.status(201).send({
      success: true,
      message: "Nueva sala creada",
      room,
    })*/
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