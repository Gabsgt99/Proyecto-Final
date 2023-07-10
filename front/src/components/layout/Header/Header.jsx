import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../../Assets/Logo.png";
import { faLinkedin, faTwitter, faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faLinkedin, faTwitter, faInstagram, faYoutube, faFacebook);

export function Header() {
  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid header-container">

         {/* Logo */}
         <div className="header-logo">
          <img className="Logo" src={Logo} alt="Logo" />
        </div>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/LoginPage">
                Usuario
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="https://factoriaf5.org/">
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
        {/* Iconos RRSS */}
        <div className="social-icons">
          <Link to="https://www.linkedin.com/company/factor%C3%ADaf5/">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="social-icon"
            />
          </Link>
          <Link to="https://twitter.com/factoriaf5">
            <FontAwesomeIcon
              icon={faTwitter}
              className="social-icon"
            />
          </Link>
          <Link to="http://instagram.com/factoria_f5/">
            <FontAwesomeIcon
              icon={faInstagram}
              className="social-icon"
            />
          </Link>
          <Link to="https://www.youtube.com/channel/UCazHbN7ChOJxRXW0-K1zczw">
            <FontAwesomeIcon
              icon={faYoutube}
              className="social-icon"
            />
          </Link>
          <Link to="https://www.facebook.com/factoriaf5/">
            <FontAwesomeIcon
              icon={faFacebook}
              className="social-icon"
            />
          </Link>
        </div>
       
        {/* Toggle Button and Navigation */}
        <div className="header-toggler">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
      </div>
    </nav>
  );
}
