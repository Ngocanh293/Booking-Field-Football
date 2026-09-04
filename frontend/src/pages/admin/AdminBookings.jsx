import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    if (window.confirm(`Xác nhận chuyển trạng thái thành: ${status}?`)) {
      try {
        await api.put(`/bookings/${id}/status`, { status });
        fetchBookings();
      } catch (error) {
        alert('Lỗi khi cập nhật trạng thái');
      }
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'PENDING': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-bold border border-yellow-200">Chờ duyệt</span>;
      case 'CONFIRMED': return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold border border-blue-200">Đã chốt</span>;
      case 'COMPLETED': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-bold border border-green-200">Hoàn thành</span>;
      case 'CANCELLED': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-bold border border-red-200">Đã hủy</span>;
      default: return status;
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Quản lý Đặt Sân</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Khách hàng</th>
                  <th className="p-4 font-semibold">Sân bóng</th>
                  <th className="p-4 font-semibold">Thời gian đá</th>
                  <th className="p-4 font-semibold">Tổng tiền</th>
                  <th className="p-4 font-semibold">Trạng thái</th>
                  <th className="p-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center text-gray-500">Chưa có ai đặt sân.</td></tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{b.User?.full_name}</div>
                        <div className="text-xs text-gray-500">{b.User?.phone}</div>
                      </td>
                      <td className="p-4 font-bold text-green-700">{b.Field?.name}</td>
                      <td className="p-4">
                        <div className="font-semibold text-gray-800">{b.booking_date}</div>
                        <div className="text-sm text-gray-600">{b.start_time.substring(0,5)} - {b.end_time.substring(0,5)}</div>
                      </td>
                      <td className="p-4 font-bold text-gray-800">{b.total_price.toLocaleString('vi-VN')} đ</td>
                      <td className="p-4">{getStatusBadge(b.status)}</td>
                      <td className="p-4 text-center space-x-2">
                        {b.status === 'PENDING' && (
                          <>
                            <button onClick={() => updateStatus(b.id, 'CONFIRMED')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors shadow">Duyệt</button>
                            <button onClick={() => updateStatus(b.id, 'CANCELLED')} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors shadow">Hủy</button>
                          </>
                        )}
                        {b.status === 'CONFIRMED' && (
                          <button onClick={() => updateStatus(b.id, 'COMPLETED')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors shadow">Đã thu tiền</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
