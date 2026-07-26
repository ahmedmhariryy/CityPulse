import axios from 'axios';

const api = axios.create({
  baseURL: 'https://city-pulse-smoky.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      
      const isAuthOperation = 
        url.includes('/auth/login') ||
        url.includes('/auth/register') ||
        url.includes('/auth/update-password') ||
        url.includes('/auth/update-me');
      
      if (!isAuthOperation) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (userData) =>
    api.post('/auth/register', userData),

  getMe: () =>
    api.get('/auth/me'),

  logout: () =>
    api.post('/auth/logout'),

  updateMe: (userData) =>
    api.patch('/auth/update-me', userData),

  updatePassword: (currentPassword, newPassword) =>
    api.patch('/auth/update-password', { currentPassword, newPassword }),
};

export const reportAPI = {
  createReport: (formDataToSend) =>
    api.post('/reports', formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),

  getMyReports: () =>
    api.get('/reports/my-reports'),

  getReportById: (id) =>
    api.get(`/reports/${id}`),

  deleteReport: (id) =>
    api.delete(`/reports/${id}`),

  rateReport: (id, score, comment) =>
    api.patch(`/reports/${id}/rate`, { score, comment }),

  trackReport: (reportNumber) =>
    api.get(`/reports/track/${reportNumber}`),
};

export const contactAPI = {
  submitContact: (data) =>
    api.post('/contact', data),
};

export const adminAPI = {
  getDashboardStats: () =>
    api.get('/admin/dashboard/stats'),

  getAllReports: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/admin/reports?${params}`);
  },

  getReportDetails: (reportId) =>
    api.get(`/admin/reports/${reportId}`),

  updateReportStatus: (reportId, status, note) =>
    api.patch(`/admin/reports/${reportId}/status`, { status, note }),

  assignReport: (reportId, assignedTo, note) =>
    api.patch(`/admin/reports/${reportId}/assign`, { assignedTo, note }),

  deleteReport: (reportId) =>
    api.delete(`/admin/reports/${reportId}`),

  getAnalytics: () =>
    api.get('/admin/analytics'),

  getAllUsers: () =>
    api.get('/admin/users'),

  toggleUserStatus: (userId, isActive) =>
    api.patch(`/admin/users/${userId}/status`, { isActive }),

  getHeatmapData: (timeRange) =>
    api.get(`/heatmap/data${timeRange ? `?timeRange=${timeRange}` : ''}`),

  runClustering: () =>
    api.post('/clustering/run'),

  getContacts: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/contact?${params}`);
  },

  markContactRead: (id) =>
    api.patch(`/contact/${id}/read`),

  toggleContactReplied: (id) =>
    api.patch(`/contact/${id}/replied`),
};

export default api;