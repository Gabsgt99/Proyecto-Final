import React from 'react'
import Header from './Header/Header';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

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