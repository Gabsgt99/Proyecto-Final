import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ModalComponent from '../ModalComponent/ModalComponent.jsx';

export default function FullCalendarComponent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const startTime = `${Math.max(currentHour, 8).toString().padStart(2, '0')}:00`;
  const endTime = '18:00';

  const handleDateSelect = (selectInfo) => {
    const { start, end, startStr } = selectInfo;
    const selectedDateTime = new Date(startStr);

    // Validar que no se pueda seleccionar fechas anteriores a la actual
    if (selectedDateTime < currentTime) {
      return;
    }

    // Validar que no se puedan seleccionar fines de semana (sábado: 6, domingo: 0)
    if (selectedDateTime.getDay() === 6 || selectedDateTime.getDay() === 0) {
      return;
    }

    setSelectedDate(startStr);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          validRange={{
            start: '2023-01-01', // Fecha mínima permitida en el calendario
            end: '2023-12-31' // Fecha máxima permitida en el calendario
          }}
          weekends={true} // Deshabilitar fines de semana
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
            startTime: '08:00', // Hora de inicio (8 AM)
            endTime: '18:00' // Hora de fin (6 PM)
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          now={currentTime.toISOString()}
          scrollTime={currentTime.getHours() + ':00:00'}
        />
      </div>
      {selectedDate && (
        <ModalComponent
          selectedDate={selectedDate}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          startTime={startTime}
          endTime={endTime}
        />
      )}
    </div>
  );
}