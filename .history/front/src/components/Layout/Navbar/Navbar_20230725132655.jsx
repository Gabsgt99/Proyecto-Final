import React, { useState } from "react";
import styled from "styled-components";
import BurguerButton from "../../BurguerButton/BurguerButton.jsx";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    //cuando esta true lo pasa a false y vice versa
    setClicked(!clicked);
  };
  return (
    <>
      <NavContainer>
        <span></span>
        <div className={`links ${clicked ? "active" : ""}`}>
          <a onClick={handleClick} href="https://factoriaf5.org/">
            HOME
          </a>
          <a onClick={handleClick} href="/">
            USUARIO
          </a>
          <a onClick={handleClick} href="https://factoriaf5.org/">
            CERRAR
          </a>
        </div>
        <div className="burguer">
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv
          id="BgDiv"
          className={`initial ${clicked ? " active" : ""}`}
        ></BgDiv>
      </NavContainer>
    </>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  span {
    color: #ff4700;
    font-weight: 200;
    span {
      font-weight: bold;
    }
  }
  padding: 0.1rem;
  background-color: #ff4700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: black;
    text-decoration: none;
    margin-right: 3rem;
  }
  .links {
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all 0.5s ease;
    a {
      color: white;
      font-size: 1rem;
      display: block;
      z-index: 4;
    }
    @media (min-width: 768px) {
      position: initial;
      margin: 7px;
      a {
        font-size: 1rem;
        color: white;
        transition: color 0.3s;
        display: inline;
        cursor: pointer;
      }
      a:hoover {
        color: black;
      }
    }
  }

  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    margin-top: 10px;
    a {
      font-size: 1rem;
      margin-top: 1rem;
      color: white;
    }
  }

  .burguer {
    @media (min-width: 768px) {
      display: none;
    }
  }
  #BgDiv {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const BgDiv = styled.div`
  background-color: #ff4700;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 0.3s ease;
  opacity: 0.8;
  &.active {
    border-radius: 0 0 80% 0;
    top: 210px;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;