import axios from 'axios';
import { getFromLocalStorage } from '../../utils/ls-utils.ts';

const defaultOptions = {
  baseURL: process.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
};

const api = axios.create(defaultOptions);

api.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage('access_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401)
        console.error('Unauthorized. Redirecting to login...');

      console.error(`Response error [${status}]:`, data);
    } else {
      console.error('Network or other error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
