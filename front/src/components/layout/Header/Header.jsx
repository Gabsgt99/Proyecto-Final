import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../../Assets/Logo.png";
import {  faTwitter, faInstagram, faYoutube, faFacebook} from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Agrega los iconos Link la biblioteca

library.add(faLinkedin, faTwitter, faInstagram, faYoutube, faFacebook);

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <nav className="container-fluid">
        {/* Logo */}
        <div className="header-logo">
          <img className="Logo" src={Logo} alt="Logo" />
        </div>
const 
        {/*Iconos RRSS*/}
        <div class="fusion-alignright">
          <div class="fusion-social-links-header">
            <div class="fusion-social-networks">
              <div class="fusion-social-networks-wrapper">
                <Link
                  class="fusion-social-network-icon fusion-tooltip fusion-linkedin awb-icon-linkedin"
                  style="color: black"
                  data-placement="bottom"
                  data-title="LinkedIn"
                  data-toggle="tooltip"
                  title=""
                  to="https://www.linkedin.com/company/factor%C3%ADaf5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-original-title="LinkedIn"
                >
                  <span class="screen-reader-text">LinkedIn</span>
                </Link>
                <Link
                  class="fusion-social-network-icon fusion-tooltip fusion-twitter awb-icon-twitter"
                  style="color: black"
                  data-placement="bottom"
                  data-title="Twitter"
                  data-toggle="tooltip"
                  title=""
                  to="https://twitter.com/factoriaf5"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-original-title="Twitter"
                >
                  <span class="screen-reader-text">Twitter</span>
                </Link>
                <Link
                  class="fusion-social-network-icon fusion-tooltip fusion-instagram awb-icon-instagram"
                  style="color: black"
                  data-placement="bottom"
                  data-title="Instagram"
                  data-toggle="tooltip"
                  title=""
                  to="https://www.instagram.com/factoria_f5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-original-title="Instagram"
                >
                  <span class="screen-reader-text">Instagram</span>
                </Link>
                <Link
                  class="fusion-social-network-icon fusion-tooltip fusion-youtube awb-icon-youtube"
                  style="color: black"
                  data-placement="bottom"
                  data-title="YouTube"
                  data-toggle="tooltip"
                  title=""
                  to="https://www.youtube.com/channel/UCazHbN7ChOJxRXW0-K1zczw"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-original-title="YouTube"
                >
                  <span class="screen-reader-text">YouTube</span>
                </Link>
                <Link
                  class="fusion-social-network-icon fusion-tooltip fusion-facebook awb-icon-facebook"
                  style="color: black"
                  data-placement="bottom"
                  data-title="Facebook"
                  data-toggle="tooltip"
                  title=""
                  to="https://www.facebook.com/factoriaf5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-original-title="Facebook"
                >
                  <span class="screen-reader-text">Facebook</span>
                </Link>
              </div>
            </div>
          </div>{" "}
          </div>

        {/* Toggle Button and Navigation */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="#navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="Header.jsx">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="LoginPage.jsx">
                Usuario
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link " to="https://factoriaf5.org/">
                Cerrar sesion
              </Link>
            </li>
          </ul>
        </div>
      </nav>
</nav>
  );
}