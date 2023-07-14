import React, { useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from 'axios'

function Rooms() {
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () =>{
    const answer = await axios.get('http://localhost:8080/api/v1/room/create-room')
    console.log(answer)
  }

  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para enviar la foto al servidor
    console.log("Foto seleccionada:", photo);
  };

  return (
    <div className="container">
      <h1 className="text-center">GESTIÓN DE SALAS</h1>
      <div className="row">
        <div className="col-9">
          <h3 className="text-center">Lista de salas</h3>
          <table className="table table-light">
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
              <tr>
                <td>1</td>
                <td>AULA Mary Lee Woods</td>
                <td>25 personas</td>
                <td>
                  Aula destinada a la formación del alumnado que acude a los cursos y talleres de Factoría F5.
                </td>
                <td>
                  <img src="http://localhost:8080/api/v1/room/images/1689340730576-calendario.jpg" alt="Foto de sala" className="img-fluid" />
                </td>
                <td>
                  <button className="btn btn-outline-dark"><BiPencil /></button>
                </td>
                <td>
                  <button className="btn btn-outline-secondary"><BiTrash /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <h3>NUEVA SALA</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de la sala</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Capacidad</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Foto</label>
              <input type="file" className="form-control" onChange={handlePhotoChange} />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button className="btn btn-primary me-md-2" type="submit" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
