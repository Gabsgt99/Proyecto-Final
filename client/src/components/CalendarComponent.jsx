import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CalendarComponent = ({ roomId, userRole }) => {
  const calendarRef = useRef(null);

  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationFormData, setReservationFormData] = useState({
    startDate: '',
    startTime: '',
    endTime: ''
  });

  const handleDateSelect = (selectInfo) => {
    const { startStr } = selectInfo;

    const defaultStartTime = '08:00';
    const defaultEndTime = '18:00';

    setReservationFormData({
      startDate: startStr,
      startTime: defaultStartTime,
      endTime: defaultEndTime
    });

    setShowReservationModal(true);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setReservationFormData({
      ...reservationFormData,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { startDate, startTime, endTime } = reservationFormData;

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const selectedDate = new Date(startDate);
    const selectedHour = parseInt(startTime.split(':')[0]);
    const selectedMinute = parseInt(startTime.split(':')[1]);

    // Verificar que la fecha actual esté dentro del rango permitido
    const maxReservationDate = new Date(selectedDate);
    if (userRole === 'normal') {
      maxReservationDate.setDate(maxReservationDate.getDate() - 14);
      if (currentTime < maxReservationDate) {
        setError('La fecha seleccionada debe estar dentro del rango permitido (hasta 14 días antes de la fecha de la reserva)');
        return;
      }
    }

    if (
      selectedDate.toDateString() === currentTime.toDateString() &&
      (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute < currentMinute))
    ) {
      setError('La hora de inicio debe ser mayor o igual a la hora actual');
      return;
    } else if (startTime >= endTime) {
      setError('La hora de fin debe ser mayor a la hora de inicio de la reserva');
      return;
    } else {
      const startTimeFormatted = moment(`${startDate}T${startTime}`).format();
      const endTimeFormatted = moment(`${startDate}T${endTime}`).format();

      // Verificar restricciones adicionales para usuarios normales
      if (userRole === 'normal') {
        const maxDuration = 2; // Máxima duración en horas para usuarios normales
        const durationInHours = moment(endTimeFormatted).diff(startTimeFormatted, 'hours');
        if (durationInHours > maxDuration) {
          setError('La duración máxima de la reserva para usuarios normales es de 2 horas');
          return;
        }

        // Verificar superposición de horarios
        if (!checkReservationAvailability(startTimeFormatted, endTimeFormatted)) {
          setError('Ya existe una reserva en ese rango de horas');
          return;
        }
      }

      // Verificar superposición de horarios
      if (!checkReservationAvailability(startTimeFormatted, endTimeFormatted)) {
        setError('Ya hay una reserva existente con esos datos');
        return;
      }

      const newReservation = {
        userId: '64a68b590e95b932adb3b733', // Assuming you have the user ID
        roomId: roomId,
        startDate: startTimeFormatted,
        endDate: endTimeFormatted
      };

      try {
        await axios.post('/api/v1/bookings/create-booking', newReservation);
        setShowReservationModal(false);
        setReservationFormData({
          startDate: '',
          startTime: '',
          endTime: ''
        });
        setError('');

        // Fetch updated events after creating the reservation
        fetchEvents();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const eventRender = (eventInfo) => {
    const event = events.find((e) => e.id === eventInfo.event.id);
    if (event) {
      return renderEventContent(eventInfo);
    } else {
      return (
        <div>
          <i>Sin reservas</i>
        </div>
      );
    }
  };

  const selectAllow = (selectInfo) => {
    const { start } = selectInfo;
    const currentDay = start.getDay();
    const currentDate = new Date(start);

    // Verificar si la fecha seleccionada no es un sábado (6) o domingo (0) y no es anterior a la fecha actual
    const today = new Date();
    return currentDay !== 6 && currentDay !== 0 && currentDate >= today;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`/api/v1/bookings/get-bookings/${roomId}`);
      const bookings = res.data.bookings;
      const formattedEvents = bookings.map((booking) => ({
        id: booking._id,
        title: 'Reservado',
        start: moment(booking.start_date).format('YYYY-MM-DDTHH:mm'),
        end: moment(booking.end_date).format('YYYY-MM-DDTHH:mm'),
        allDay: false
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const startTime = `${Math.max(currentHour, 8).toString().padStart(2, '0')}:00`;
  const endTime = '18:00';

  // Función para verificar superposición de horarios
  const checkReservationAvailability = (newStart, newEnd) => {
    for (const event of events) {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      const newStartTime = moment(newStart);
      const newEndTime = moment(newEnd);

      if (
        (newStartTime.isSameOrAfter(eventStart) && newStartTime.isBefore(eventEnd)) ||
        (newEndTime.isAfter(eventStart) && newEndTime.isSameOrBefore(eventEnd)) ||
        (newStartTime.isBefore(eventStart) && newEndTime.isAfter(eventEnd))
      ) {
        return false; // Existe superposición de horarios
      }
    }

    return true; // No hay superposición de horarios
  };

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          selectAllow={selectAllow}
          eventContent={eventRender}
          now={currentTime.toISOString()}
          scrollTime={currentTime.getHours() + ':00:00'}
          locale='es'
          events={events}
        />
      </div>

      <Modal show={showReservationModal} onHide={() => setShowReservationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reservar Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId='formStartDate'>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type='date'
                name='startDate'
                value={reservationFormData.startDate}
                onChange={handleFormInputChange}
                min={currentTime.toISOString().split('T')[0]}
                required
              />
            </Form.Group>
            <Form.Group controlId='formStartTime'>
              <Form.Label>Hora de inicio</Form.Label>
              <Form.Control
                as='select'
                name='startTime'
                value={reservationFormData.startTime}
                onChange={handleFormInputChange}
                required
              >
                <option value=''>Seleccionar hora de inicio</option>
                {generateTimeOptions('08:00', '18:00', 30)}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formEndTime'>
              <Form.Label>Hora de fin</Form.Label>
              <Form.Control
                as='select'
                name='endTime'
                value={reservationFormData.endTime}
                onChange={handleFormInputChange}
                required
              >
                <option value=''>Seleccionar hora de fin</option>
                {generateTimeOptions(reservationFormData.startTime, '18:00', 30)}
              </Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Reservar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CalendarComponent;

// Helper function para generar opciones de tiempo
const generateTimeOptions = (startTime, endTime, step) => {
  const start = moment(startTime, 'HH:mm');
  const end = moment(endTime, 'HH:mm');
  const timeOptions = [];

  while (start.isBefore(end)) {
    timeOptions.push(start.format('HH:mm'));
    start.add(step, 'minutes');
  }

  return timeOptions.map((time) => (
    <option key={time} value={time}>
      {time}
    </option>
  ));
};