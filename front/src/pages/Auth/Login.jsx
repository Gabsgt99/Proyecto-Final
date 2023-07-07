import React, { useState } from 'react';
import loginImg from "../../Assets/LoginImg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useAuth } from '../../components/context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password
      });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        /* Mensaje de error con el inicio de sesión */
      }
    } catch (error) {
      console.log(error);
      /* Mensaje de error con el inicio de sesión */
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col ">
            <img src={loginImg} className="img-fluid" width="100%" alt="laptop login image" />
          </div>
        </div>
        <div className="row text-center">
          <div className="col col-login py-5 fs-1 fw-bold text-white">
            Login
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 bg-white p-5 align-items-center">
            <FontAwesomeIcon icon={faCode} className='icon-code' />
          </div>

          <div className="col-sm-6 bg-white p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="userEmailInput" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmailInput"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordInput"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Iniciar sesión
              </button>
              <Link to="/forgot-password">
                <p className="p-2">¿Has olvidado tu contraseña?</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;