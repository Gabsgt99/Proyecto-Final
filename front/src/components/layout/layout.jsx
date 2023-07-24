import React from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';

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
};
export  default Layout;