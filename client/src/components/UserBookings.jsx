import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/api/v1/bookings/get-bookingsbyuser`);
      const bookings = response.data.bookings.map((booking) => ({
        ...booking,
        room: booking.room.name // Filtrar y obtener solo el campo 'name' de la sala
      }));
    console.log(bookings)
      setUserBookings(bookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ul className="list-group">
      {userBookings.map((booking) => (
        <li key={booking.id} className="list-group-item">
          <p>Reserva ID: {booking._id}</p>
          <p>Usuario: {booking.user}</p>
          <p>Sala: {booking.room}</p> {/* Ahora solo contiene el nombre de la sala */}
          <p>Fecha de inicio: {booking.start_date}</p>
          <p>Fecha de fin: {booking.end_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserBookings;