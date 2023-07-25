import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { GlobalContext } from '../context/GlobalContext.jsx';

export default function ModalComponent({ selectedDate, isModalOpen, closeModal, startTime, endTime }) {
  const { addNewReservation } = useContext(GlobalContext);
  const [eventFormData, setEventFormData] = useState({
    firstName: '',
    lastName: '',
    date: selectedDate,
    startTime: startTime,
    endTime: endTime,
  });
  const [error, setError] = useState('');

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setEventFormData({
      ...eventFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, date, startTime, endTime } = eventFormData;

    const currentDate = new Date();
    const selectedDateTime = new Date(`${date}T${startTime}`);

    // Validar que se haya seleccionado una hora válida
    if (startTime === '' || endTime === '') {
      setError('Por favor, selecciona una hora válida');
    } else if (selectedDateTime <= currentDate) {
      setError('La fecha y hora seleccionada debe ser mayor que la fecha y hora actual');
    } else if (date !== currentDate.toISOString().slice(0, 10) && startTime >= endTime) {
      setError('La hora de fin debe ser mayor a la hora de inicio de la reserva');
    } else if (startTime < '08:00' || endTime > '18:00') {
      setError('Las horas de inicio y fin deben estar dentro del rango válido de 8 AM a 6 PM');
    } else {
      const newReservation = {
        firstName,
        lastName,
        date,
        startTime,
        endTime,
      };
      addNewReservation(newReservation);
      closeModal();
    }
  };

  useEffect(() => {
    setEventFormData((prevFormData) => ({
      ...prevFormData,
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
    }));
    setError('');
  }, [selectedDate, startTime, endTime]);

  // Función para generar opciones de hora desde las 8 AM hasta las 6 PM con intervalos de 15 minutos
  const generateHourOptions = () => {
    const options = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(
          <option key={`${formattedHour}:${formattedMinute}`} value={`${formattedHour}:${formattedMinute}`}>
            {`${formattedHour}:${formattedMinute}`}
          </option>
        );
      }
    }
    return options;
  };

  return (
    <>
      <Modal show={isModalOpen} onHide={closeModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId='formFirstName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type='text'
                name='firstName'
                value={eventFormData.firstName}
                onChange={handleFormInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='formLastName'>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                value={eventFormData.lastName}
                onChange={handleFormInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='formDate'>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type='text'
                name='date'
                value={eventFormData.date}
                onChange={handleFormInputChange}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group controlId='formStartTime'>
              <Form.Label>Hora de Inicio</Form.Label>
              <Form.Control
                as='select'
                name='startTime'
                value={eventFormData.startTime}
                onChange={handleFormInputChange}
                required
              >
                <option value=''>Selecciona tu hora</option>
                {generateHourOptions()}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formEndTime'>
              <Form.Label>Hora de Fin</Form.Label>
              <Form.Control
                as='select'
                name='endTime'
                value={eventFormData.endTime}
                onChange={handleFormInputChange}
                required
              >
                <option value=''>Selecciona tu hora</option>
                {generateHourOptions()}
              </Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Reservar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}