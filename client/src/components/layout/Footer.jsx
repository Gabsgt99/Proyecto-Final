import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p className="text-center mt-3">Todos los derechos reservados 2021 
        |<Link to="/">Aviso legal </Link>|<Link to="/"> Política de Privacidad </Link>|
        <Link to="/"> Política de Cookies </Link>|
        <Link to="/"> Contacta </Link>|
        <Link to="/"> Transparencia </Link>|
        <Link to="/"> Blog </Link>|
        <Link to="/"> Diseño Web Barcelona</Link>
      </p>
    </div>
  );
};

export default Footer;