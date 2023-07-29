import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/AdminBookings.css'; // Importa el archivo CSS

const AdminBookings = () => {
  const [allBookings, setAllBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`/api/v1/bookings/get-allbookings`);
      const bookings = response.data.bookings;
      setAllBookings(bookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ul className="list-group">
      {allBookings.map((booking) => (
        <li key={booking._id} className="list-group-item mb-3 p-3 bg-white shadow-sm rounded">
          <p className="font-weight-bold title-user ">Reserva ID:</p>
          <p>{booking._id}</p>
          <p className="font-weight-bold title-user">Usuario:</p>
          <p>{booking.user}</p>
          <p className="font-weight-bold title-user ">Sala:</p>
          <p>{booking.room}</p>
          <p className="font-weight-bold title-user">Fecha de inicio:</p>
          <p>{moment(booking.start_date).format('DD-MM-YYYY HH:mm')}</p>
          <p className="font-weight-bold title-user">Fecha de fin:</p>
          <p>{moment(booking.end_date).format('DD-MM-YYYY HH:mm')}</p>
        </li>
      ))}
    </ul>
  );
};

export default AdminBookings;