import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import { ReservationProvider } from './components/context/ReservationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ReservationProvider>
  <AuthProvider>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </AuthProvider>
  </ReservationProvider>
);

