import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Đường dẫn kết nối tới Backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Trước khi gửi request đi, tự động đính kèm Token (nếu có)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
