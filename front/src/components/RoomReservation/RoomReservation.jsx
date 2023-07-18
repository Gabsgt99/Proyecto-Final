import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { createEventId } from './../../event-utils';
import './RoomReservation.css';

export default class DemoApp extends React.Component {
  state = {
    isModalOpen: false,
    eventFormData: {
      firstName: '',
      lastName: '',
      date: '',
      startTime: '',
      endTime: ''
    },
    error: ''
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, error: '' });
  };

  handleDateSelect = (selectInfo) => {
    const { startStr } = selectInfo;
    const { eventFormData } = this.state;

    const defaultStartTime = '08:00';
    const defaultEndTime = '18:00';

    this.setState({
      eventFormData: {
        ...eventFormData,
        date: startStr,
        startTime: defaultStartTime,
        endTime: defaultEndTime
      },
      isModalOpen: true
    });
  };

  handleFormInputChange = (event) => {
    const { name, value } = event.target;
    const { eventFormData } = this.state;

    this.setState({
      eventFormData: {
        ...eventFormData,
        [name]: value
      }
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { eventFormData } = this.state;
    const { firstName, lastName, date, startTime, endTime } = eventFormData;

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const selectedDate = new Date(date);
    const selectedHour = parseInt(startTime.split(':')[0]);
    const selectedMinute = parseInt(startTime.split(':')[1]);

    if (
      selectedDate.toDateString() === currentTime.toDateString() &&
      (selectedHour < currentHour || (selectedHour === currentHour && selectedMinute < currentMinute))
    ) {
      this.setState({
        error: 'La hora de inicio debe ser mayor o igual a la hora actual'
      });
    } else if (startTime >= endTime) {
      this.setState({
        error: 'La hora de fin debe ser mayor a la hora de inicio de la reserva'
      });
    } else {
      const calendarApi = this.calendarRef.getApi();

      calendarApi.addEvent({
        id: createEventId(),
        title: `${firstName} ${lastName}`,
        start: `${date}T${startTime}`,
        end: `${date}T${endTime}`,
        allDay: false
      });

      this.setState({
        isModalOpen: false,
        eventFormData: {
          firstName: '',
          lastName: '',
          date: '',
          startTime: '',
          endTime: ''
        },
        error: ''
      });
    }
  };

  renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  selectAllow = (selectInfo) => {
    const { start } = selectInfo;
    const currentDay = start.getDay();
    const currentDate = new Date(start);

    // Verificar si la fecha seleccionada no es un sábado (6) o domingo (0) y no es anterior a la fecha actual
    const today = new Date();
    return currentDay !== 6 && currentDay !== 0 && currentDate >= today;
  };

  generateTimeOptions = (startTime, endTime, interval) => {
    const options = [];

    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);

    let currentTime = new Date(start);

    while (currentTime <= end) {
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      options.push(<option key={formattedTime} value={formattedTime}>{formattedTime}</option>);

      currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return options;
  };

  render() {
    const { isModalOpen, eventFormData, error } = this.state;

    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const startTime = `${Math.max(currentHour, 8).toString().padStart(2, '0')}:00`;
    const endTime = '18:00';

    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            ref={(ref) => (this.calendarRef = ref)}
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
            select={this.handleDateSelect}
            selectAllow={this.selectAllow} // Controlar la selección de fechas
            eventContent={this.renderEventContent}
            now={currentTime.toISOString()} // Establecer la fecha y hora actual
            scrollTime={currentTime.getHours() + ':00:00'} // Hacer scroll hasta la hora actual
          />
        </div>
        <Modal show={isModalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId='formFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  name='firstName'
                  value={eventFormData.firstName}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId='formLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  name='lastName'
                  value={eventFormData.lastName}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId='formDate'>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type='date'
                  name='date'
                  value={eventFormData.date}
                  onChange={this.handleFormInputChange}
                  min={currentTime.toISOString().split('T')[0]} // Restringir fechas anteriores a la fecha actual
                  required
                />
              </Form.Group>
              <Form.Group controlId='formStartTime'>
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  as='select'
                  name='startTime'
                  value={eventFormData.startTime}
                  onChange={this.handleFormInputChange}
                  required
                >
                  <option value=''>Select Start Time</option>
                  {this.generateTimeOptions('08:00', '18:00', 30)}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='formEndTime'>
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  as='select'
                  name='endTime'
                  value={eventFormData.endTime}
                  onChange={this.handleFormInputChange}
                  required
                >
                  <option value=''>Select End Time</option>
                  {this.generateTimeOptions('08:00', '18:00', 30)}
                </Form.Control>
              </Form.Group>
              <Button variant='primary' type='submit'>
                Reservar
              </Button>
              <Button variant='secondary' onClick={this.closeModal}>
                Cancelar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}