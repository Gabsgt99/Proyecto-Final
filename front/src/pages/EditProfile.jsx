import React, { useState } from 'react';
import '../../src/index.css';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSaveChanges = () => {
    console.log('Guardando cambios:', { name, lastName, email });
  };

  return (
    <div className="container">
      <div className="link">
        <Link to="/">Administrador</Link> 
         <Link to="/">Cerrar Sesión</Link>
      </div>
      <h1 className='editar'>Editar perfil</h1>
      <div className="form-container">
      <form>
        <div className="input-container">
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Apellidos:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </form>
    </div>
      <div className="buttons-container">
         <button type="button" className="cancel-button">
            Cancelar
          </button>
            <button type="button" onClick={handleSaveChanges} className="save-button">
            Guardar cambios
          </button>
       </div>

    </div>
  );
};

export default EditProfile;