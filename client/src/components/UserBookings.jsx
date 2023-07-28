import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/api/v1/bookings/get-bookingsbyuser`);
      const bookings = response.data.bookings;
      
      const formattedEvents = await Promise.all(
        bookings.map(async (booking) => {
          const userResponse = await axios.get(`/api/v1/auth/${booking._id}`);
          const roomResponse = await axios.get(`/api/v1/rooms/${booking._id}`);

          return {
            id: booking._id,
            title: userResponse.data.name, // Assuming the user name property is "name"
            roomId: roomResponse.data.name, // Assuming the room name property is "name"
            start: moment(booking.start_date).format('YYYY-MM-DDTHH:mm'),
            end: moment(booking.end_date).format('YYYY-MM-DDTHH:mm'),
            allDay: false
          };
        })
      );

      setUserBookings(formattedEvents);
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
          <p>Reserva ID: {booking.id}</p>
          <p>Usuario: {booking.title}</p>
          <p>Sala: {booking.roomId}</p>
          <p>Fecha de inicio: {booking.start}</p>
          <p>Fecha de fin: {booking.end}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserBookings;