import React, { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Layout from "../../components/Layout/Layout.jsx";

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/rooms/get-rooms"
      );
      setRooms(response.data.rooms);
    } catch (error) {
      console.error("Error al cargar las salas:", error);
    }
  };

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target); // Cambiar esta línea

      const response = await axios.post(
        "http://localhost:8080/api/v1/rooms/create-room",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Sala creada:", response.data);

      handleCloseModal();
      loadData();
    } catch (error) {
      console.error("Error al crear la sala:", error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const loadRoomData = async (roomId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/rooms/${roomId}`
      );
      setSelectedRoom(response.data.rooms);
      setShowEditModal(true);
    } catch (error) {
      console.error("Error al cargar los datos de la sala:", error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      // Verificar si selectedRoom está definido
      if (!selectedRoom) {
        console.error("La sala seleccionada no está definida.");
        return;
      }

      const formData = new FormData(event.target.form); // Cambiar esta línea

      const response = await axios.put(
        `http://localhost:8080/api/v1/rooms/update-room/${selectedRoom._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Sala actualizada:", response.data);

      handleCloseEditModal();
      loadData();
    } catch (error) {
      console.error("Error al actualizar la sala:", error);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedRoom(null);
  };

  const handleDelete = async (roomId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/rooms/delete-room/${roomId}`
      );

      console.log("Sala eliminada:", response.data);

      loadData();
    } catch (error) {
      console.error("Error al eliminar la sala:", error);
    }
  };

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "white",
          color: "#FE4702",
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
              style={{ backgroundColor: "#FE4702", borderColor: "#FE4702" }}
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
                          src={`http://localhost:8080/api/v1/rooms/room-photo/${room._id}`}
                          alt="Foto de sala"
                          className="img-fluid"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-light"
                          onClick={() => loadRoomData(room._id)}
                        >
                          <BiPencil />
                        </button>
                        <button
                          className="btn btn-outline-light"
                          onClick={() => handleDelete(room._id)}
                        >
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

        {/* Modal para crear una nueva sala */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>NUEVA SALA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre de la sala</label>
                <input type="text" name="name" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacidad</label>
                <input
                  type="number"
                  name="capacity"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input
                  type="file"
                  name="photo"
                  className="form-control"
                  onChange={handlePhotoChange}
                />
              </div>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: "#FE4702", borderColor: "#FE4702" }}
                onClick={handleSubmit}
              >
                Crear
              </Button>
            </form>
          </Modal.Body>
        </Modal>

        {/* Modal para editar una sala */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>EDITAR SALA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRoom && (
              <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre de la sala</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    defaultValue={selectedRoom.name}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Capacidad</label>
                  <input
                    type="number"
                    name="capacity"
                    className="form-control"
                    defaultValue={selectedRoom.capacity}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    defaultValue={selectedRoom.description}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Foto</label>
                  <input
                    type="file"
                    name="photo"
                    className="form-control"
                    onChange={handlePhotoChange}
                  />
                  {/* Vista previa de la foto */}
                  {selectedRoom.photo && (
                    <img
                      src={URL.createObjectURL(selectedRoom.photo)}
                      alt="Foto seleccionada"
                      className="img-fluid mt-2"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </div>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#FE4702", borderColor: "#FE4702" }}
                  onClick={handleEditSubmit}
                >
                  Confirmar
                </Button>
              </form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
}

export default RoomManagement;