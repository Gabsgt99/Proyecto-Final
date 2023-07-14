import React from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { INITIAL_EVENTS, createEventId } from './../../event-utils';
import './RoomReservation.css';

export default class DemoApp extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    isModalOpen: false,
    eventFormData: {
      title: '',
      firstName: '',
      lastName: '',
      date: '',
      startTime: '',
      endTime: ''
    }
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    });
  };

  handleDateSelect = (selectInfo) => {
    const { startStr } = selectInfo;
    const { eventFormData } = this.state;

    this.setState({
      eventFormData: {
        ...eventFormData,
        date: startStr
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
    const { eventFormData, currentEvents } = this.state;
    const { title, firstName, lastName, date, startTime, endTime } = eventFormData;

    const calendarApi = this.calendarRef.getApi();

    calendarApi.addEvent({
      id: createEventId(),
      title: `${title} - ${firstName} ${lastName}`,
      start: `${date}T${startTime}`,
      end: `${date}T${endTime}`,
      allDay: false
    });

    this.setState({
      currentEvents: [...currentEvents, { title: `${title} - ${firstName} ${lastName}`, start: date, end: date }],
      isModalOpen: false,
      eventFormData: {
        title: '',
        firstName: '',
        lastName: '',
        date: '',
        startTime: '',
        endTime: ''
      }
    });
  };

  renderSidebarEvent(event) {
    return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    );
  }

  renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  render() {
    const { isModalOpen, eventFormData } = this.state;

    return (
      <div className='demo-app'>
        {this.renderSidebar()}
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
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            select={this.handleDateSelect}
            eventContent={this.renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
          />
        </div>
        <Modal show={isModalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={eventFormData.title}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={eventFormData.firstName}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={eventFormData.lastName}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={eventFormData.date}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={eventFormData.startTime}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={eventFormData.endTime}
                  onChange={this.handleFormInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Event
              </Button>
              <Button variant="secondary" onClick={this.closeModal}>
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            />
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(this.renderSidebarEvent)}
          </ul>
        </div>
      </div>
    );
  }
}