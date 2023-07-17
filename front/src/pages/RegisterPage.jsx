import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [admi, setAdmi] = useState(false); // Cambiado a un valor booleano
  const [isActive, setActive] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        lastname,
        email,
        admi,
      });
      if (res && res.data.success) {
        /* alert.success(res.data && res.data.message); */ //<===aqui va un mensaje popup de exito en el registro ======
        navigate("/"); //Aqui poner a donde va despues del registro==========
      } else {
        //<===aqui va un mensaje popup
        console.log(name, lastname, email, admi);
      }
    } catch (error) {
      console.log(error);
      //<===aqui va un mensaje popup
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5 px-5 ">
          <h1 className="editar">Registrar nuevo usuario</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group py-3">
              <label htmlFor="firstName">Nombres:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group py-3">
              <label htmlFor="lastName">Apellidos:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group py-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <label style={{ marginRight: "5px"}}>
                Admi:
              </label>
              <input
                type="checkbox"
                name="admi"
                checked={admi}
                onChange={(e) => setAdmi(e.target.checked)}
              />
            </div>
            <div className="button-container">
              <button
                type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;