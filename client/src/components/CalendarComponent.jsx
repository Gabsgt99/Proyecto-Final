import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const CalendarComponent = ({ roomId, handleDateClick }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Función para obtener las reservas desde el backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/v1/rooms/${roomId}/bookings`);
        const bookings = response.data.bookings;

        // Formatear las reservas para el calendario
        const formattedEvents = bookings.map((booking) => ({
          title: "Reservado",
          start: new Date(booking.start_date),
          end: new Date(booking.end_date),
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [roomId]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(info) => handleDateClick(info.event.start)}
    />
  );
};

export default CalendarComponent;