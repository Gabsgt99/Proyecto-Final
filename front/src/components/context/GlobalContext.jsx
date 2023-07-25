import React, { createContext, useState, useEffect } from 'react';
import { getAllReservations, addReservation } from '../../api';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  // Obtener todas las reservas cuando el componente se monta
  useEffect(() => {
    getAllReservations()
      .then((data) => setReservations(data))
      .catch((error) => console.error('Error al obtener las reservas:', error));
  }, []);

  // Agregar una nueva reserva
  const addNewReservation = (newReservation) => {
    addReservation(newReservation)
      .then((data) => {
        if (data) {
          setReservations([...reservations, data]);
        }
      })
      .catch((error) => console.error('Error al agregar la reserva:', error));
  };

  return (
    <GlobalContext.Provider value={{ reservations, addNewReservation }}>
      {children}
    </GlobalContext.Provider>
  );
};