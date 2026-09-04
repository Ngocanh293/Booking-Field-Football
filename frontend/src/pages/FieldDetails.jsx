import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const FieldDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchField = async () => {
      try {
        const response = await api.get(`/fields/${id}`);
        setField(response.data);
      } catch (error) {
        console.error("Lỗi tải thông tin sân:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchField();
  }, [id]);

  const handleBookSlot = async (slot) => {
    if (!token) {
      alert("Bạn cần đăng nhập để đặt sân!");
      navigate('/login');
      return;
    }

    if (window.confirm(`Xác nhận đặt sân ca ${slot.start_time.substring(0, 5)} - ${slot.end_time.substring(0, 5)} ngày ${date}?`)) {
      setBookingLoading(true);
      try {
        await api.post('/bookings', {
          field_id: field.id,
          booking_date: date,
          start_time: slot.start_time,
          end_time: slot.end_time,
          total_price: field.price_per_hour
        });
        alert('Đặt sân thành công! Đang chờ Admin xác nhận.');
      } catch (error) {
        alert(error.response?.data?.message || 'Có lỗi xảy ra khi đặt sân.');
      } finally {
        setBookingLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!field) {
    return <div className="text-center mt-20 text-xl font-bold">Không tìm thấy sân bóng.</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Cột trái: Ảnh và Thông tin cơ bản */}
        <div className="md:w-1/2 bg-gray-100 relative">
          {field.image_url ? (
            <img src={field.image_url} alt={field.name} className="w-full h-full object-cover min-h-[300px]" />
          ) : (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center text-8xl bg-green-50">🏟️</div>
          )}
          <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-1.5 rounded-lg font-bold shadow">
            {field.price_per_hour.toLocaleString('vi-VN')} đ / giờ
          </div>
        </div>

        {/* Cột phải: Chi tiết và Khung giờ */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-extrabold text-gray-900">{field.name}</h1>
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">
              Sân {field.field_type}
            </span>
          </div>
          
          <p className="text-gray-600 mb-6 flex items-start gap-2">
            <span>📍</span> {field.address}
          </p>
          
          <div className="bg-green-50 p-4 rounded-xl mb-8 border border-green-100">
            <h3 className="font-bold text-green-800 mb-2">Mô tả sân:</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{field.description || 'Chưa có mô tả chi tiết cho sân bóng này.'}</p>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            📅 Chọn Lịch & Đặt Sân
          </h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn ngày đá:</label>
            <input 
              type="date" 
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="flex-grow">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Các ca hiện có:</label>
            {(!field.FieldTimeSlots || field.FieldTimeSlots.length === 0) ? (
              <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg border border-gray-200">Sân này chưa được cấu hình khung giờ.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {field.FieldTimeSlots.map(slot => (
                  <button
                    key={slot.id}
                    disabled={bookingLoading}
                    onClick={() => handleBookSlot(slot)}
                    className="border-2 border-green-500 text-green-700 font-bold py-2 px-3 rounded-xl hover:bg-green-500 hover:text-white transition-colors focus:ring-4 focus:ring-green-200 disabled:opacity-50"
                  >
                    {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
                  </button>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FieldDetails;
