import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await api.get('/fields');
        setFields(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách sân", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Banner Khẩu hiệu */}
      <div className="mb-12 text-center bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-10 text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tìm Sân Bóng Nhanh Chóng</h1>
        <p className="text-lg text-green-100 max-w-2xl mx-auto">Hệ thống đặt sân bóng tự động, minh bạch giá cả, không sợ trùng lịch. Lựa chọn sân bóng phù hợp và đặt lịch ngay hôm nay!</p>
      </div>

      {/* Danh Sách Sân Bóng */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sân Bóng Đang Hoạt Động</h2>
      
      {fields.length === 0 ? (
        <div className="text-center text-gray-500 bg-white p-10 rounded-2xl shadow">Hiện chưa có sân bóng nào trên hệ thống.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map(field => (
            <div key={field.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              
              {/* Hình ảnh sân */}
              <div className="h-56 bg-gray-200 relative group overflow-hidden">
                {field.image_url ? (
                  <img src={field.image_url} alt={field.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-green-50 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-6xl">🏟️</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-sm font-extrabold text-green-700 shadow-lg">
                  {field.price_per_hour.toLocaleString('vi-VN')} đ/h
                </div>
              </div>

              {/* Thông tin sân */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 truncate pr-2">{field.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-md border border-green-200 whitespace-nowrap">
                    Sân {field.field_type}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-6 flex items-start gap-1 h-10 overflow-hidden line-clamp-2">
                  <span className="mt-0.5">📍</span> {field.address}
                </p>
                
                <Link 
                  to={`/field/${field.id}`}
                  className="block w-full text-center bg-gray-900 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md"
                >
                  Xem Lịch & Đặt Sân
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
