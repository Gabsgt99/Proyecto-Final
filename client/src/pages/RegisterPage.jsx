import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/index.css";
import Layout from "../components/Layout/Layout.jsx";

function RegisterPage() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isActive, setActive] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        lastname,
        email,
        admin,
      });
      if (res && res.data.success) {
        /* alert.success(res.data && res.data.message); */ //<===aqui va un mensaje popup de exito en el registro ======
        navigate("/"); //Aqui poner a donde va despues del registro==========
      } else {
        //<===aqui va un mensaje popup
        console.log(name, lastname, email, admin);
      }
    } catch (error) {
      console.log(error);
      //<===aqui va un mensaje popup
    }
  };

  return (
    <Layout>
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
              <input type="checkbox" className="btn-check" id="btncheck1" autocomplete="off"/>
              <label className="btn btn-outline-primary" for="btncheck1">Soy Admin?</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="admin"
                  checked={admin}
                  onChange={(e) => setAdmin(e.target.checked)}/>
                <label className="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
              </div>
                {/* <label style={{ marginRight: "5px" }}>Admin:</label>
                <input
                  type="checkbox"
                  name="admin"
                  checked={admin}
                  onChange={(e) => setAdmin(e.target.checked)}
                /> */}
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
    </Layout>
  );
}

export default RegisterPage;