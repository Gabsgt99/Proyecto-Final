import React, { useState } from 'react';
import loginImg from "../Assets/LoginImg.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';


function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleUsernameOrEmailChange = (e) => {
    setUsernameOrEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username or Email:', usernameOrEmail);
    console.log('Password:', password);
    setIsClicked(true);

    // Simulando una petición al servidor
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col ">
            <img src={loginImg} className="img-fluid" width="100%" alt="laptop login imagin" />
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
                <label htmlFor="usernameOrEmailInput" className="form-label">Usuario o email</label>
                <input
                  type="text"
                  className="form-control"
                  id="usernameOrEmailInput"
                  placeholder="Ingresa tu usuario o email"
                  value={usernameOrEmail}
                  onChange={handleUsernameOrEmailChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control "
                  id="passwordInput"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                className={`btn ${isClicked ? 'btn-white' : 'btn-dark'}`}
                onClick={handleSubmit}
              >
                Iniciar sesión
              </button>

              <p className='p-2'>¿Has olvidado tu contraseña?</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;