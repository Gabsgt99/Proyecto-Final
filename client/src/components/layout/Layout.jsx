import React from 'react'
import Header from '../Layout/Header/Header.jsx';
import Footer from '../Layout/Footer.jsx';
import Navbar from '../Layout/Navbar.jsx';

const Layout = ({children}) => {
  return (
    <div>
    <Header/>
    <Navbar/>
    <main style={{minHeight:"70vh"}}>
    {children}
    </main>
    <Footer/>
    </div>
  )
}

export default Layout;