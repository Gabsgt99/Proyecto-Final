import React, { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Layout from './';


function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/room/create-room"
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error al cargar las salas:", error);
    }
  };

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para enviar la foto al servidor
    console.log("Foto seleccionada:", photo);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
        <Layout>
    <div
      style={{
        backgroundColor: "white", // Fondo blanco
        color: "#FE4702", // Texto naranja
        minHeight: "100vh",
        padding: "80px",
      }}
    >
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex justify-content-between w-75">
          <h1 className="text-left">GESTIÓN DE SALAS</h1>
          <Button
            className="btn btn-outline-light"
            onClick={handleShowModal}
            style={{ backgroundColor: "#FE4702", borderColor: "#FE4702" }} // Botón naranja
          >
            Crear nueva sala
          </Button>
        </div>

        <div className="row w-75 mt-4">
          <div className="col text-left">
            <h3>Lista de salas</h3>
            <table className="table table-striped table-light table-bordered">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Capacidad</th>
                  <th>Descripción</th>
                  <th>Foto</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{room.name}</td>
                    <td>{room.capacity}</td>
                    <td>{room.description}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/api/v1/room/images/${room.image}`}
                        alt="Foto de sala"
                        className="img-fluid"
                      />
                    </td>
                    <td>
                      <button className="btn btn-outline-light">
                        <BiPencil />
                      </button>
                      <button className="btn btn-outline-light">
                        <BiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal para el formulario de nueva sala */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>NUEVA SALA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de la sala</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Capacidad</label>
              <input type="number" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Foto</label>
              <input
                type="file"
                className="form-control"
                onChange={handlePhotoChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: "#FE4702", borderColor: "#FE4702" }} // Botón naranja
          >
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </Layout>
  );
}

export default RoomManagement;

