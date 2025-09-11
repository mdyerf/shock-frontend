// lib/axios.ts
import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
