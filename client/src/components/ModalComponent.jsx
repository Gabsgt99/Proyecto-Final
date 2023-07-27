import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import axios from 'axios';

const ModalComponent = ({ selectedDate, isModalOpen, closeModal }) => {
  const [eventFormData, setEventFormData] = useState({
    firstName: '',
    lastName: '',
    date: selectedDate ? selectedDate.toISOString().split('T')[0] : '', // Convert date to string if available
    startTime: '', // Initialize startTime and endTime states
    endTime: '',
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

    // Validaciones...

    try {
      const reservationData = {
        firstName,
        lastName,
        date,
        startTime,
        endTime,
      };

      await axios.post('/api/v1/bookings/create-booking', reservationData);

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setEventFormData((prevFormData) => ({
        ...prevFormData,
        date: selectedDate.toISOString().split('T')[0],
      }));
    }
    setError('');
  }, [selectedDate]);

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
              <TimePicker
                name='startTime'
                value={eventFormData.startTime}
                onChange={(startTime) => handleFormInputChange({ target: { name: 'startTime', value: startTime } })}
                required
              />
            </Form.Group>
            <Form.Group controlId='formEndTime'>
              <Form.Label>Hora de Fin</Form.Label>
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