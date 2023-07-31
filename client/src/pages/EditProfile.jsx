import React, { useState } from "react";
import Layout from "../components/Layout/Layout.jsx";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setActive] = useState(null);

  return (
    <Layout>
      <div className="container" style={{ maxWidth: "500px" }}>
        <h1 className="edit pt-5 d-flex justify-content-center" style={{ color: "#ff4700", fontFamily: "'Poppins', sans-serif" }}>
          Editar perfil
        </h1>
        <div className="form-container p-3">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombres:
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Apellidos:
              </label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico:
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
        <div className="button d-flex justify-content-around">
          <button
            type="button"
            name="cancelar"
            className={`btn btn-dark ${isActive === "cancel" ? "active" : ""}`}
            onClick={() => setActive("cancel")}
            style={{ backgroundColor: "#020100" }} // Cambiar el color de fondo del botón
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`btn btn-dark ${isActive === "save" ? "active" : ""}`}
            onClick={() => setActive("save")}
            style={{ backgroundColor: "#020100" }} // Cambiar el color de fondo del botón
          >
            Guardar
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;