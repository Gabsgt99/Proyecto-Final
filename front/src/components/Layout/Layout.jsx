import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';



const Layout = ({ children, title, description, keywords, author }) => {
    return (
      <div>
        <Header />
      <main style={{ minHeight: "70vh" }}>
{children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Gestión de Salas Factoria F5",
  description: "mern stack project",
  keywords: "",
  author: "Equipo Naranja",
};

export default Layout;