import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Bảng Điều Khiển (Dashboard)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Thẻ thống kê 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">🏟️</div>
          <h3 className="text-gray-500 font-medium">Tổng số Sân</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">--</p>
        </div>
        
        {/* Thẻ thống kê 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">📋</div>
          <h3 className="text-gray-500 font-medium">Lượt Đặt Sân</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">--</p>
        </div>
        
        {/* Thẻ thống kê 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">👥</div>
          <h3 className="text-gray-500 font-medium">Khách Hàng</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">--</p>
        </div>
        
        {/* Thẻ thống kê 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">💰</div>
          <h3 className="text-gray-500 font-medium">Doanh Thu Tạm Tính</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">-- đ</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Chào mừng đến với Khu vực Quản Trị</h2>
        <p className="text-gray-600">Hãy chọn các chức năng bên menu trái để bắt đầu quản lý hệ thống Booking của bạn.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
