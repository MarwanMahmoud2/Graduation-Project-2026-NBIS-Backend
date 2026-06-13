import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor - attach token on every call
client.interceptors.request.use(
  (config) => {
    // Check localStorage first, then sessionStorage
    const token = localStorage.getItem('nbis_token') || sessionStorage.getItem('nbis_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let the browser set proper multipart boundaries for FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return client(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Clear both storage types
      localStorage.removeItem('nbis_token');
      localStorage.removeItem('nbis_user');
      localStorage.removeItem('nbis_remember');
      sessionStorage.removeItem('nbis_token');
      sessionStorage.removeItem('nbis_user');

      processQueue(error, null);
      isRefreshing = false;

      // Redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default client;
