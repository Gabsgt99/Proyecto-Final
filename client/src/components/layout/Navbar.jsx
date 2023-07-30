import React, { useState } from 'react';
import styled from 'styled-components';
import BurguerButton from './BurguerButton.jsx';
import { useAuth} from "../../context/Auth.jsx";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
        ...auth, 
        user:null,
        token:"",
    });
    localStorage.removeItem("auth");
    toast.success("Te has deslogueado");
  };
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked)
  }
  return (
    <>
      <NavContainer>
        <span></span>
        <div className={`links ${clicked ? '' : ''}`}>
          <a onClick={handleClick} href="/">HOME</a>
          {/* {auth.user.isadmin ? ( */}
          <>
          <a onClick={handleClick} href="#">Hola! {auth?.user?.name}</a>
          <a onClick={handleClick} href="/">DASHBOARD</a>
          <a onClick={handleLogout} href="/">LOGOUT</a>
        </>
         {/*  ) : ('') } */}
          </div>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv id="BgDiv" className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
      </NavContainer>
    </>
  )
};

export default Navbar;

const NavContainer = styled.nav`
  span{
    color: #ff4700;
    font-weight: 200;
    span{
      font-weight: bold;
    }
  }
  padding: .1rem; 
  background-color: #ff4700;
  display: flex;
  align-items: center;
  justify-content: space-between;
   a{
    display: block;
    color: white;
    text-decoration: none;
    margin-right: 3rem;
    text-transform:uppercase;
  }  
  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;

      @media(min-width: 768px){
      position: initial;
      margin: 3px;
      a{
        font-size: 1rem;
        color: white;
        transition: color 0.3s;
        display: inline;
        cursor: pointer;
       
      } 
      a.hoover{
        color: black;
      }
    }
  }

  .links.active{
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
    a{
      font-size: 1rem;
      margin-top: 1rem;
      color: white;
    }
  } 

  .burguer{
    @media(min-width: 768px){
      display: none;
    }
  }
  #BgDiv{

    @media(min-width: 768px){
      display: none;
    }
  }
`

const BgDiv = styled.div`
  background-color: #FF4700;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .3s ease ;
  


  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`