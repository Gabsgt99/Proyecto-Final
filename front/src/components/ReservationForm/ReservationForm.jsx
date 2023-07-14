import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { parse, differenceInMinutes } from 'date-fns';
import Modal from 'react-modal';

const ReservationForm = () => {
  const initialFormData = {
    name: '',
    lastName: '',
    email: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { handleSubmit } = useForm();

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validar el rango horario
    const start = parse(formData.startTime, 'HH:mm', new Date());
    const end = parse(formData.endTime, 'HH:mm', new Date());
    const diffInMinutes = differenceInMinutes(end, start);

    if (diffInMinutes <= 0 || diffInMinutes > 120) {
      // Mostrar mensaje de error si el rango horario es inválido
      setValidationErrors({
        range:
          'El rango horario debe ser mayor a 0 minutos y menor o igual a 120 minutos (2 horas).',
      });
      return;
    }

    // Aquí puedes enviar el formulario al servidor
    // ...

    // Restablecer el formulario y mostrar mensaje de éxito
    setFormData(initialFormData);
    setIsSubmitting(false);
    setShowSuccessMessage(true);
    setShowModal(false); // Cerrar el modal después de enviar el formulario
  };

  return (
    <div>
      <button onClick={handleModalOpen}>Reservar</button>

      <Modal isOpen={showModal} onRequestClose={handleModalClose}>
        <h2>Reserva de Sala</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="startDate">Fecha de reserva:</label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="startTime">Hora de inicio:</label>
            <input
              type="time"
              id="startTime"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="endTime">Hora de fin:</label>
            <input
              type="time"
              id="endTime"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
            />
          </div>

          {validationErrors.range && <span>{validationErrors.range}</span>}

          <button type="submit" disabled={isSubmitting}>
            Reservar
          </button>

          {showSuccessMessage && <p>Tu reserva ha sido realizada exitosamente.</p>}
        </form>
      </Modal>
    </div>
  );
};

export default ReservationForm;