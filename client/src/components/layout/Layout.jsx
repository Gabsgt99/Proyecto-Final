import React from 'react'
import Header from '../Layot/Header/Header';
import Footer from './Footer.jsx
import Navbar from '../Layot/Navbar.jsxvbar.jsx';

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