import axios from 'axios';

// Configuración de Axios con una base URL
export const API = axios.create({
  baseURL: 'https://api.jikan.moe/v4/', // Base URL de la API
});
