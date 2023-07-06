import React from 'react';
import { Header } from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import { useHistory } from 'react-router-dom';
import '../App.css';

export function Cabina0Page() {
 
  const history = useHistory();

  const handleReservar = () => {
    // Lógica para reservar
    console.log('Botón Reservar clickeado');
  };

  const handleEditar = () => {
    // Lógica para editar
    console.log('Botón Editar clickeado');
  };

  return (
    <>
      <Header></Header>

      <div className="body-container">
        <div className="photo">
          <img src="front\src\Assets\Cabina0.png" alt="Cabina-0" />
        </div>

        <div className="text">
          <p>Cabina 0, cabina para reuniones personales o clases online que tienen un poco más de privacidad</p>
        </div>

        <div className="buttons">
          <button onClick={handleReservar}>Reservar</button>
          <button onClick={handleEditar}>Editar</button>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Cabina0Page;
