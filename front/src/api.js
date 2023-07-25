import axios from 'axios';

const API_BASE_URL = 'http://tu-servidor-mongodb/api'; // Reemplaza con la URL de tu servidor

// Función para obtener todas las reservas
export const getAllReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reservations`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    return [];
  }
};

// Función para agregar una nueva reserva
export const addReservation = async (newReservation) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reservations`, newReservation);
    return response.data;
  } catch (error) {
    console.error('Error al agregar la reserva:', error);
    return null;
  }
};