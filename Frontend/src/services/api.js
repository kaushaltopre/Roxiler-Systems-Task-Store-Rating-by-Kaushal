import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Add auth token to requests
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const apiService = {
  // Auth
  login: (credentials) => API.post('/api/auth/login', credentials),
  register: (userData) => API.post('/api/auth/register', userData),
  
  // Admin
  getDashboardStats: () => API.get('/api/admin/dashboard'),
  createUser: (userData) => API.post('/api/admin/users', userData),
  createStore: (storeData) => API.post('/api/admin/stores', storeData),
  getUsers: (params) => API.get('/api/admin/users', { params }),
  getStores: (params) => API.get('/api/admin/stores', { params }),
  getStoreOwners: () => API.get('/api/admin/users', { params: { role: 'store_owner' } }),
  
  // Stores
  getAllStores: (params) => API.get('/api/stores', { params }),
  getStoreRatings: () => API.get('/api/stores/my-store'),
  
  // Ratings
  submitRating: (data) => API.post('/api/ratings', data),
  getUserRatings: () => API.get('/api/ratings/my-ratings'),
  
  // Users
  updatePassword: (data) => API.put('/api/users/password', data),
};

export default apiService;