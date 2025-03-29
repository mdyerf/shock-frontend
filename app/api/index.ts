// lib/axios.ts
import axios from 'axios';

export const baseURL = process.env.BACKEND_URL || 'http://127.0.0.1:8081/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
