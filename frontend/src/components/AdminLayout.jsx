import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userString = localStorage.getItem('user');
  const user = userString && userString !== 'undefined' ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin', label: '📊 Dashboard', exact: true },
    { path: '/admin/fields', label: '🏟️ Quản lý Sân Bóng' },
    { path: '/admin/timeslots', label: '⏰ Quản lý Khung Giờ' },
    { path: '/admin/bookings', label: '📋 Quản lý Đặt Sân' },
    { path: '/admin/users', label: '👥 Quản lý Khách Hàng' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* Sidebar Bên Trái */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl">
        <div className="p-6 text-center border-b border-gray-800">
          <Link to="/" className="text-2xl font-extrabold tracking-wider hover:text-green-400 transition-colors">
            ⚽ ADMIN PRO
          </Link>
          <p className="text-gray-400 text-sm mt-2">Xin chào, <span className="text-green-400 font-bold">{user?.full_name}</span></p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-green-600 text-white shadow-lg translate-x-2' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-bold transition-colors shadow-md flex justify-center items-center gap-2"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Khu vực Nội dung chính Bên Phải */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        {/* Outlet là nơi React Router sẽ nhúng các trang con vào (Fields, Bookings...) */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
