import React from 'react';
import './Footer.css'
import {Link} from 'react-router-dom'
import logof5 from '../../../Assets/logof5.png';

const Footer = () => {
  return (
    <>    
     <footer>
      <div className="logo">
        <img src={logof5} alt="Logo" />
      </div>
      <div className="footer-links">
        <ul>
            <li>
            <span >Todos los derechos reservados 2021</span>
          </li>
          <li>|</li>
          <li>
            <Link to="https://factoriaf5.org/aviso-legal/">Aviso legal</Link> 
          </li>
          <li>|</li>
          <li>
            <Link to="https://factoriaf5.org/politica-de-privacidad/">Políticas de privacidad</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="https://factoriaf5.org/politica-de-cookies/">Políticas de Cookies</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="https://factoriaf5.org/contacto/">Contacto</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="https://factoriaf5.org/somos/#transpariencia">Transparencia</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="https://factoriaf5.org/blog/">Blog</Link>
          </li>
          <li>|</li>
          <li>
            <Link to="https://www.crixa.es/" target="_blank" rel="noopener">Diseño Web Barcelona</Link>
          </li>
        </ul>
      </div>
    </footer>   
    </>
  );
};

export default Footer;
