import React from 'react';
import logo from './logof5.png';
import './Footer.css'
import {Link} from 'react-router-dom'


const Footer = () => {
  return (
    <>    
     <footer>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="footer-links">
        <ul>
            <li>
            <span >Todos los derechos reservados 2021</span>
          </li>
          <li>|</li>
          <li>
            <Link to="#">Aviso legal</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="#">Políticas de privacidad</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="#">Políticas de Cookies</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="#">Contacto</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="#">Transparencia</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="#">Blog</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="#">Diseño Web Barcelona</Link>
          </li>
        </ul>
      </div>
    </footer>
    </>
  );
};

export default Footer;
