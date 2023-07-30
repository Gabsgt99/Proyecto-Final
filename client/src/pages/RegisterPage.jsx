import React, { useState } from "react";
import axios from "axios";
import "../../src/index.css";
import Layout from "../components/Layout/Layout.jsx";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [isActive, setActive] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name,email,admin);
    toast.success('Te has registrado correctamente')
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        admin,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message); 
        //navigate("/"); 
      } else {
        toast.error(res.data.message)
        console.log(name, email, admin);
      }
    } catch (error) {
      console.log(error);
      toast.error('Algo salió mal');
    }
  };
  
  console.log(process.env.REACT_APP_API);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5 px-5 ">
            <h1 className="editar">Registrar nuevo usuario</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group py-3">
                <label htmlFor="Name">Nombre y Apellidos:</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="admin"
                  onChange={(e) => setAdmin(e.target.checked)} />
                <label className="form-check-label" for="flexSwitchCheckDefault">Es Admin?</label>
              </div>
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