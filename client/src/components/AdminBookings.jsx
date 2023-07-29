import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminBookings = () => {
  const [allBookings, setAllBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/api/v1/bookings/get-all-bookings`);
      const bookings = response.data.bookings;
      setAllBookings(bookings);
    } catch (error) {
      console.error(error);
      toast.error('Error al obtener las reservas');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ul className="list-group">
      {allBookings.map((booking) => (
        <li key={booking._id} className="list-group-item">
          <p>Reserva ID: {booking._id}</p>
          <p>Usuario: {booking.user}</p>
          <p>Sala: {booking.room}</p>
          <p>Fecha de inicio: {booking.start_date}</p>
          <p>Fecha de fin: {booking.end_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default AdminBookings;