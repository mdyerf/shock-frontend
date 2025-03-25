// lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://127.0.0.1:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
