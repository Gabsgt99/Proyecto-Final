import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../../Assets/Logo.png";
import { faLinkedin,faTwitter,faInstagram,faYoutube,faFacebook,} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faLinkedin, faTwitter, faInstagram, faYoutube, faFacebook);

export function Header() {
  const BurguerButton = () => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
      setClicked(!clicked);
    };

    return (
      <div className={`links ${clicked ? "active" : ""}`}>
        <Link onClick={handleClick} to="#"></Link>
        <Link onClick={handleClick} to="#"></Link>
        <Link onClick={handleClick} to="#"></Link>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid header-container">
        {/* Logo */}
        <div className="header-logo">
          <img className="Logo" src={Logo} alt="Logo" />
        </div>
        {/* Iconos RRSS */}
        <div className="social-icons">
          <Link to="https://www.linkedin.com/company/factor%C3%ADaf5/">
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </Link>
          <Link to="https://twitter.com/factoriaf5">
            <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          </Link>
          <Link to="http://instagram.com/factoria_f5/">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </Link>
          <Link to="https://www.youtube.com/channel/UCazHbN7ChOJxRXW0-K1zczw">
            <FontAwesomeIcon icon={faYoutube} className="social-icon" />
          </Link>
          <Link to="https://www.facebook.com/factoriaf5/">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          </Link>
        </div>
        <div className="burguer">
          <BurguerButton />
        </div>
      </div>
    </nav>
  );
}
