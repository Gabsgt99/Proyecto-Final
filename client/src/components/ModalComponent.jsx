import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import TimePicker from 'react-time-picker'; // Importa el componente TimePicker aquí
import axios from 'axios';

const ModalComponent = ({ selectedDate, isModalOpen, closeModal, startTime, endTime }) => {
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

  const handleFormSubmit = async (event) => {
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
      // Aquí puedes agregar la lógica para enviar la reserva al backend
      // Por ejemplo, usando axios.post('/api/v1/bookings', eventFormData)
      try {
        await axios.post('/api/v1/bookings', eventFormData);
        closeModal();
      } catch (error) {
        console.error(error);
      }
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
              {/* Reemplaza el select por el componente TimePicker */}
              <TimePicker
                name='startTime'
                value={eventFormData.startTime}
                onChange={(startTime) => handleFormInputChange({ target: { name: 'startTime', value: startTime } })}
                required
              />
            </Form.Group>
            <Form.Group controlId='formEndTime'>
              <Form.Label>Hora de Fin</Form.Label>
              {/* Reemplaza el select por el componente TimePicker */}
              <TimePicker
                name='endTime'
                value={eventFormData.endTime}
                onChange={(endTime) => handleFormInputChange({ target: { name: 'endTime', value: endTime } })}
                required
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Reservar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalComponent;