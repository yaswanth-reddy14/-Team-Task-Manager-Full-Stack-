import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getProfile: () => api.get('/api/auth/profile'),
};

// Project endpoints
export const projectAPI = {
  createProject: (data) => api.post('/api/projects', data),
  getProjects: () => api.get('/api/projects'),
  getProject: (id) => api.get(`/api/projects/${id}`),
  updateProject: (id, data) => api.put(`/api/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/api/projects/${id}`),
  addMember: (projectId, data) => api.post(`/api/projects/${projectId}/members`, data),
  getMembers: (projectId) => api.get(`/api/projects/${projectId}/members`),
  removeMember: (projectId, memberId) => api.delete(`/api/projects/${projectId}/members/${memberId}`),
};

// Task endpoints
export const taskAPI = {
  createTask: (projectId, data) => api.post(`/api/tasks/${projectId}`, data),
  getTasks: (projectId, filters) => api.get(`/api/tasks/${projectId}`, { params: filters }),
  getTask: (id) => api.get(`/api/tasks/task/${id}`),
  updateTask: (id, data) => api.put(`/api/tasks/task/${id}`, data),
  deleteTask: (id) => api.delete(`/api/tasks/task/${id}`),
  getDashboardStats: () => api.get('/api/tasks/dashboard/stats'),
};

export default api;
