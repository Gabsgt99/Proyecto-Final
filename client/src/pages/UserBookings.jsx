import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import '../styles/UserBookings.css';


const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/api/v1/bookings/get-bookingsbyuser`);
      const bookings = response.data.bookings.map((booking) => ({
        ...booking,
        room: booking.room.name, // Filtrar y obtener solo el campo 'name' de la sala
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
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <ul className="list-group custom-list-group">
          {userBookings.map((booking) => (
            <li key={booking._id} className="list-group-item mb-3 p-3 bg-white rounded">
              <p className=" mb-1  title-user">Reserva ID:</p>
              <p>{booking._id}</p>
              <p className="mb-1 title-user">Sala:</p>
              <p>{booking.room}</p>
              <p className=" mb-1  title-user">Fecha de inicio:</p>
              <p>{moment(booking.start_date).format('DD-MM-YYYY HH:mm')}</p>
              <p className=" mb-1 title-user">Fecha de fin:</p>
              <p>{moment(booking.end_date).format('DD-MM-YYYY HH:mm')}</p>
              <button
                className="btn btn-danger p-2 custom-button"
                onClick={() => handleDeleteBooking(booking._id)}
              >
                <FontAwesomeIcon
                  id={`button-${booking._id}`}
                  icon={faTrashAlt}
                  style={{ fontSize: '1.3em', color: '#020100' }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserBookings;