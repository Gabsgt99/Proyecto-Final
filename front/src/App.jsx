import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/Auth/LoginPage"
import EquipoPage from "./pages/EquipoPage"
import ReunionPage from "./pages/ReunionPage";
import MaryLeePage from "./pages/MaryLeePage";
import HedyLamarPage from "./pages/HedyLamarPage";
import Cabina0Page from "./pages/Cabina0Page";
import Cabina1Page from "./pages/Cabina1Page";
import RegisterPage from "./pages/RegisterPage";


 
function App() {

  return (
  
        <Routes>
          <Route path="/"exact element={<HomePage />}/>
          <Route path="/login" element={<LoginPage />}/> 
          <Route path="/salaequipo" element={<EquipoPage />}/>
          <Route path="/salareunion" element={<ReunionPage />}/>
          <Route path="/salamarylee" element={<MaryLeePage />}/>
          <Route path='/salahedylamar' element={ <HedyLamarPage />} />
          <Route path='/cabina0' element={ <Cabina0Page />} />
          <Route path='/cabina1' element={ <Cabina1Page />} />
          <Route path='/registro' element={ <RegisterPage />} />
        </Routes>

  );
};

export default App;
