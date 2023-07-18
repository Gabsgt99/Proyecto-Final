import React from 'react';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children,title,description,keywords,author }) => {
    return(
     
        <div>
            <Header/>
            <main style={{minHeight:'70vh'}}>
            {children}</main>
            <Footer/>
        </div>
    )
};

Layout.defaultProps = {
    title:'Gestion Salas',
    description:'Reservas Salas Equipo de trabajo',
    keywords:'mern, react, nodejs,mongodb',
    author:'Equipo Naranja',
}

export default Layout;

<li className="nav-item">
  <Link className="nav-link" to="https://www.linkedin.com/company/factor%C3%ADaf5/">
  <FontAwesomeIcon icon="fa-brands fa-linkedin" />
  </Link>
</li>
<li className="nav-item">
  <Link className="nav-link" to="https://twitter.com/FactoriaF5">
  <FontAwesomeIcon icon="fa-brands fa-twitter" />
  </Link>
</li>
<li className="nav-item">
  <Link className="nav-link" to="https://www.instagram.com/factoria_f5/">  
  <FontAwesomeIcon icon="fa-brands fa-instagram" /> 
  </Link>
</li>
<li className="nav-item">
  <Link className="nav-link" to="https://www.youtube.com/@factoriaf5687/about">
  <FontAwesomeIcon icon="fa-brands fa-youtube" />
  </Link>
</li>
<li className="nav-item">
  <Link className="nav-link" to="https://www.facebook.com/factoriaf5/">
  <FontAwesomeIcon icon="fa-brands fa-facebook" />
  </Link>
</li>







<nav class="navbar navbar-expand-lg bg-body-tertiary">
        


          

<ul className="navbar-nav mx-auto"></ul>

{/* logo F5 */}
<div className="container-fluid">
<Link className="fusion-logo-link" to="https://factoriaf5.org/">
  <img
    src="https://factoriaf5.org/wp-content/uploads/2021/07/logo.png"
    srcset="https://factoriaf5.org/wp-content/uploads/2021/07/logo.png 1x, https://factoriaf5.org/wp-content/uploads/2021/07/logo-x2.png 2x"
    width="120"
    height="60"
    reactstyle="max-height:60px;height:auto;"
    alt="Factoría F5 Logo"
    data-retina_logo_url="https://factoriaf5.org/wp-content/uploads/2021/07/logo-x2.png"
    className="fusion-standard-logo"
  />
</Link>
{/* NAVBAR */}


<Link class="navbar-brand" to="#">Casual</Link>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarTogglerDemo02">
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <Link class="nav-link active" aria-current="page" to="#">Home</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link" to="#">Link</Link>
    </li>
    <li class="nav-item">
      <Link class="nav-link disabled">Disabled</Link>
    </li>
  </ul>
</div>
</div>
</div>
</nav>  