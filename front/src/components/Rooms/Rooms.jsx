import React, { useState } from "react";

function Rooms() {
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
        <div className="col-8">
          <h3 className="text-center">Lista de salas</h3>
          <table className="table table-light">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nombre</th>
                <th>Capacidad</th>
                <th>Descripción</th>
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
                  <button className="btn btn-outline-dark">Editar</button>
                </td>
                <td>
                  <button className="btn btn-outline-secondary">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-4">
          <h3>CRUD</h3>
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
