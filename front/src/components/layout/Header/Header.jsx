import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from "../../../Assets/Logo.png"



export function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Links Title
        <div className="header-links">
          <Link title="ES" to="" className="fusion-bottombar-highlight wpml-ls-link">
            <span className="menu-text">
              <span className="wpml-ls-display">ES</span>
            </span>
          </Link>

          <Link title="CA" to="" className="fusion-bottombar-highlight wpml-ls-link">
            <span className="menu-text">
              <span className="wpml-ls-display">CA</span>
            </span>
          </Link> 
        </div>

        {/* Logo */}
        <div className="header-logo">
          <img className="Logo" src={ Logo }alt="Logo" />
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
              <Link className="nav-link active" aria-current="page" to="Header.jsx">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Usuario
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link ">Cerrar sesion</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}




