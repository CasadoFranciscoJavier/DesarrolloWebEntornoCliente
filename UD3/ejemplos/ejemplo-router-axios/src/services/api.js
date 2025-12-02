import axios from 'axios';

// Configuración de Axios con una base URL
export const API = axios.create({
  baseURL: 'http://192.168.1.175:8000/api/', // Base URL de la API
});
