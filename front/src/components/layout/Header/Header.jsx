import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaLanguage, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><FaLanguage /> ES </Nav.Link>
            <Nav.Link><FaLanguage /> CA </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://www.linkedin.com/company/factor%C3%ADaf5/"><FaLinkedin /></Nav.Link>
            <Nav.Link href="https://twitter.com/FactoriaF5"><FaTwitter /></Nav.Link>
            <Nav.Link href="https://www.instagram.com/factoria_f5/"><FaInstagram /></Nav.Link>
            <Nav.Link href="https://www.youtube.com/@factoriaf5687/about"><FaYoutube /></Nav.Link>
            <Nav.Link href="https://www.facebook.com/factoriaf5/"><FaFacebook /></Nav.Link>
          </Nav>
          <Navbar.Brand href="#">
            <img src="https://factoriaf5.org/wp-content/uploads/2021/07/logo.png" 
            srcset="https://factoriaf5.org/wp-content/uploads/2021/07/logo.png 1x, https://factoriaf5.org/wp-content/uploads/2021/07/logo-x2.png 2x"
            width="120"
            height="60"
            react_style="max-height:60px;height:auto;"
            alt="Factoría F5 Logo" 
            data-retina_logo_url="https://factoriaf5.org/wp-content/uploads/2021/07/logo-x2.png"
            className="fusion-standard-logo"
            /></Navbar.Brand>
            
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Usuario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;






// import React  from 'react';
// import {Link} from 'react-router-dom';
// import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// function Header() {
//   return (
//     <>
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//           <div className="container-fluid">            
//             <Link
//               className="navbar-brand" 
//               href="#">Navbar
//             </Link>            
//             <button className="navbar-toggler" 
//                 type="button" 
//                 data-bs-toggle="collapse" 
//                 data-bs-target="#navbarTogglerDemo02" 
//                 aria-controls="navbarTogglerDemo02" 
//                 aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon">
//               </span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link active" 
//                     aria-current="page" 
//                     href="#">Home
//                     </Link>                  
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link" 
//                     href="#">Link
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link
//                    className="nav-link disabled">Disabled
//                    </Link>                  
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//     </>
//   );
// }

// export default Header;
