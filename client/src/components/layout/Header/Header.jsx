import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
//import Logo from "";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa6";


const Header = () => {
  const BurguerButton = () => {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
      setClicked(!clicked)
    };

    return (
      <div className={`links ${clicked ? 'active' : ''}`}>
        <Link onClick={handleClick} to="#"></Link>
        <Link onClick={handleClick} to="#"></Link>
        <Link onClick={handleClick} to="#"></Link>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid header-container">

        {/* Logo */}
        <div className="header-logo">
          <img className="Logo" src="../../../assets/Logo.png" alt="LogoFactoriaF5" />
        </div>
        {/* Iconos RRSS */}
        <div className="social-icons">
          <Link to="https://www.linkedin.com/company/factor%C3%ADaf5/">
          <FaLinkedinIn className="social-icon" />
          </Link>
          <Link to="https://twitter.com/factoriaf5">
          <FaTwitter className="social-icon"/>
          </Link>
          <Link to="http://instagram.com/factoria_f5/">
          <FaInstagram className="social-icon"/>
          </Link>
          <Link to="https://www.youtube.com/channel/UCazHbN7ChOJxRXW0-K1zczw">
          <FaYoutube className="social-icon"/>
          </Link>
          <Link to="https://www.facebook.com/factoriaf5/">
          <FaFacebookF className="social-icon"/>
          </Link>
        </div>
        <div className='burguer'>
          <BurguerButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;