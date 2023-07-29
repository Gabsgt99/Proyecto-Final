import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/api/v1/bookings/get-bookingsbyuser`);
      const bookings = response.data.bookings.map((booking) => ({
        ...booking,
        room: booking.room.name // Filtrar y obtener solo el campo 'name' de la sala
      }));
      setUserBookings(bookings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`/api/v1/bookings/delete-booking/${bookingId}`);
      if (response.data.success) {
        toast.success('Reserva eliminada');
        // Actualizar la lista de reservas después de eliminar
        const updatedBookings = userBookings.filter((booking) => booking._id !== bookingId);
        setUserBookings(updatedBookings);
      } else {
        toast.error('Error al eliminar la reserva');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar la reserva');
    }
  };

  return (
    <ul className="list-group">
      {userBookings.map((booking) => (
        <li key={booking._id} className="list-group-item">
          <p>Reserva ID: {booking._id}</p>
          <p>Usuario: {booking.user}</p>
          <p>Sala: {booking.room}</p> {/* Ahora solo contiene el nombre de la sala */}
          <p>Fecha de inicio: {booking.start_date}</p>
          <p>Fecha de fin: {booking.end_date}</p>
          <button onClick={() => handleDeleteBooking(booking._id)}> <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#d86b13" }} /></button>
        </li>
      ))}
    </ul>
  );
};

export default UserBookings;