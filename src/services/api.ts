
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await api.post('/auth/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
};

export const productsAPI = {
  getProducts: async (params?: any) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getProduct: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (data: any) => {
    const response = await api.post('/products', data);
    return response.data;
  },
  
  updateProduct: async (id: number, data: any) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },
  
  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/products/categories/list');
    return response.data;
  },
};

export const jobsAPI = {
  getJobs: async (params?: any) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },
  
  getJob: async (id: number) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  
  createJob: async (data: any) => {
    const response = await api.post('/jobs', data);
    return response.data;
  },
  
  updateJob: async (id: number, data: any) => {
    const response = await api.put(`/jobs/${id}`, data);
    return response.data;
  },
  
  deleteJob: async (id: number) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
  
  getDepartments: async () => {
    const response = await api.get('/jobs/departments/list');
    return response.data;
  },
};

export default api;
