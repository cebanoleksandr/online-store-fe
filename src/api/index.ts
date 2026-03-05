import axios from 'axios';

export const http = axios.create({
  baseURL: `http://localhost:3000`,
  headers: { 'Content-Type': 'application/json' },
});

export const httpPrivate = axios.create({
  baseURL: `http://localhost:3000`,
  headers: { 'Content-Type': 'application/json' },
});

httpPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('online-store-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
