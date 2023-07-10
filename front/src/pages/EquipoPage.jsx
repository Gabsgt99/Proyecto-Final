import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import "../App.css";

export function EquipoPage() {
  const history = useNavigate();

  const handleReservar = () => {
    // Lógica para reservar
    history.push("/");
    console.log("Botón reservar clickeado");
  };

  const handleEditar = () => {
    // Lógica para editar
    history.push("/");
    console.log("Botón Editar clickeado");
  };

  return (
    <>
      <Layout>

      <div className="body-container">
        <div className="photo">
          <img src="front\src\Assets\Sala_Equipo.png" alt="sala Equipo" />
        </div>

        <div className="text">
          <p>
            Sala Equipo..........................
          </p>
        </div>

        <div className="buttons">
          <button onClick={handleReservar}>Reservar</button>
          <button onClick={handleEditar}>Editar</button>
        </div>
      </div>

      </Layout>
    </>
  );
}

export default EquipoPage;
