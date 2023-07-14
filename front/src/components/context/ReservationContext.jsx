import React, { createContext, useState } from 'react';

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    lastName: '',
  });

  // Otras funciones o estados relacionados con la reserva

  return (
    <ReservationContext.Provider value={{ userData, setUserData }}>
      {children}
    </ReservationContext.Provider>
  );
};