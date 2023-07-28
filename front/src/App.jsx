import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import React from "react";
import Login from "./pages/Auth/Login"
import RegisterPage from "./pages/RegisterPage";
import EditProfile from "./pages/EditProfile";

function App() {

  return (
   
        <Routes>
          <Route path="/"exact element={<Login />}/>
          <Route path='/registrar' element={ <RegisterPage />} />
          <Route path='/editarPerfil'element={<EditProfile/>}/>
          
          
        </Routes>
    
      
  );
};

export default App;