import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString && userString !== 'undefined' ? JSON.parse(userString) : null;

  // Nếu chưa đăng nhập hoặc không phải ADMIN thì đá văng về trang chủ
  if (!token || !user || user.role !== 'ADMIN') {
    alert('Bạn không có quyền truy cập vào khu vực này!');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
