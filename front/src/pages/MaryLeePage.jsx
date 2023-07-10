import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import "../App.css";

export function MaryLeePage() {
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
          <img src= "front\src\Assets\Aula_Mery_Lee.png" alt="Sala Mary Lee" />
        </div>

        <div className="text">
          <p>
           Sala Mary Lee
            Muler matematica i programadora de ordenador.
            Nacio en Birmingham, Inglaterra, en 1924. Trabajo
            en un equipo desarrollando programas en los ordenadores
            Mark 1, Ferranti Mark 1 y Mark 1 Star en la Escuela de
            informatica de la Universidad de Manchester.
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

export default MaryLeePage