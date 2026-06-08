import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Vehicle endpoints
export const vehicleAPI = {
  create: (vehicleData) => api.post('/vehicles', vehicleData),
  getAll: (params) => api.get('/vehicles', { params }),
  getById: (id) => api.get(`/vehicles/${id}`),
  update: (id, vehicleData) => api.put(`/vehicles/${id}`, vehicleData),
  delete: (id) => api.delete(`/vehicles/${id}`),
};

// Customer endpoints
export const customerAPI = {
  create: (customerData) => api.post('/customers', customerData),
  getAll: (params) => api.get('/customers', { params }),
  getById: (id) => api.get(`/customers/${id}`),
  update: (id, customerData) => api.put(`/customers/${id}`, customerData),
  delete: (id) => api.delete(`/customers/${id}`),
};

// Promotion endpoints
export const promotionAPI = {
  create: (promotionData) => api.post('/promotions', promotionData),
  getAll: (params) => api.get('/promotions', { params }),
  getById: (id) => api.get(`/promotions/${id}`),
  update: (id, promotionData) => api.put(`/promotions/${id}`, promotionData),
  delete: (id) => api.delete(`/promotions/${id}`),
};

// Promotion-Vehicle endpoints
export const promotionVehicleAPI = {
  create: (data) => api.post('/promotion-vehicles', data),
  getAll: (params) => api.get('/promotion-vehicles', { params }),
  getById: (id) => api.get(`/promotion-vehicles/${id}`),
  update: (id, data) => api.put(`/promotion-vehicles/${id}`, data),
  delete: (id) => api.delete(`/promotion-vehicles/${id}`),
};

// Report endpoints
export const reportAPI = {
  generate: (params) => api.get('/reports/generate', { params }),
  getDetailed: () => api.get('/reports/detailed'),
};

export default api;
