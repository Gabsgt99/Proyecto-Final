import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import "../App.css";

export function HedyLamarPage() {
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
          <img src="front\src\Assets\Aula_Hedy_Lamarr.png" alt="Sala Hedy Lamar" />
        </div>

        <div className="text">
          <p>
           Sala Hedy Lamar
          Actriz que invento el Wifi.
          Nacida el 9 de noviembre de 1914,
          Eva Maria Kiesler conocida en Hollywood 
          como Hedy Lamarr, fue una reconocida 
          actriz e inventora austriaca.
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



export default HedyLamarPage