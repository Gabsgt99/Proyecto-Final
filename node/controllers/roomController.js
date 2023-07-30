import roomModel from "../models/roomModel.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import Rooms from '../models/roomModel.js';

export const createRoomController = async (req, res) => {
  try {
    const { name, capacity, description } = req.body;
    const room = {name, capacity, description, photo: req.file.path}
    const newRoom = new Rooms(room);
    const savedRoom = await newRoom.save();
    res.json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' , mcg:error.message }) 
   /* res.status(500).send({
      success: false,
      error,
      message: "Error al crear sala",
    });*/
  }
};

    /*console.log("estamos en el controlador")
    const { name, capacity, description } = req.body;
    //console.log(req.file.name)
    console.log(req.body)
    console.log(req.file)
    const room = req.body 
    room.photo = req.file.name
    console.log(room)
    //const { photo } = req.files;
    //validation
  switch(true) {
      case !name:
        return res.status(500).send ({error:'Se requiere nombre de la sala'})
      case !capacity:
        return res.status(500).send ({error:'Se requiere capacidad de la sala'})
      case !description:
        return res.status(500).send ({error:'Se requiere descripción de la sala'})
      case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });*-
    }

    const rooms = new roomModel(req.body)
      rooms.photo = req.file.filename
      console.log(rooms)
    /*if (photo){
      rooms.photo = fs.readFileSync(photo.path)
      rooms.photo.contentType = photo.type
    }
    await rooms.save();
    res.status(201).send({
      success:true,
      message: "La sala ha sido creada satifactoriamente",
      rooms,
    }); */

export const getImage = (req, res) => {
  //sacar el parametro de la url
  const file = req.params.file;

  // montar el path real de la imagen

  const filepath = "./images/" + file;

  //comprobar que existe la imagen

  fs.stat(filepath, (error, exists) => {
    if (!exists)
      return res.status(404).send({
        status: "error",
        message: "no existe la imagen",
      });

    //devolver file
    return res.sendFile(path.resolve(filepath));
  });
};
