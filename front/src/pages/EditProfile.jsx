import React, { useState } from "react";
import "../../src/index.css";
import { Layout } from "../components/Layout/Layout";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setActive] = useState(null);

  return (
    <Layout>
      <div className="container">
        <h1 className="editar">Editar perfil</h1>
        <div className="form-container">
          <form>
            <div className="input-container">
              <label>Nombres:</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label>Apellidos:</label>
              <input
                className="form-control"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="input-container">
              <label>Correo electrónico:</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /> email
            </div>
          </form>
        </div>
        <div className="button-container">
          <button
            type="submit"
            name="cancelar"
            className={`btn btn-register ${
              isActive === "cancel" ? "active" : ""
            }`}
            onClick={() => setActive("cancel")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`btn btn-register ${
              isActive === "save" ? "active" : ""
            }`}
            onClick={() => setActive("save")}
          >
            Guardar
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
