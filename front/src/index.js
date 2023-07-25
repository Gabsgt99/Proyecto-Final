import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import { GlobalProvider } from './components/context/GlobalContext';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <AuthProvider>
  <BrowserRouter>
  <GlobalProvider>
  <App />
  </GlobalProvider>
  </BrowserRouter>
  </AuthProvider>

);

