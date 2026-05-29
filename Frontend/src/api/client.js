import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - attach token on every call
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nbis_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - on 401, clear token and redirect to login
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('nbis_token');
      localStorage.removeItem('nbis_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
