import React from 'react';
import Header from '../Layout/Header/Header.jsx';
import Footer from '../Layout/Footer.jsx';
import Navbar from '../Layout/Navbar.jsx';
import { useAuth} from "../../context/Auth.jsx";

const Layout = ({children}) => {
  const [auth] = useAuth();
console.log("=============================");
  console.log(auth);
  console.log("=============================");
  return (
    <div>
    <Header/>
 
    { !(auth.user === undefined || auth.user === null) && ( <Navbar/> )}

    <main style={{minHeight:"70vh"}}>
    {children}
    </main>
    <Footer/>
    </div>
  )
}

export default Layout;