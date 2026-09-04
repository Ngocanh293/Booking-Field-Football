import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // Lấy thông tin user an toàn, tránh lỗi parse JSON null
  const userString = localStorage.getItem('user');
  const user = userString && userString !== 'undefined' ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold tracking-wider hover:text-green-200 transition-colors flex items-center gap-2">
              <span className="text-3xl">⚽</span> FOOTFIELD BOOKING
            </Link>
          </div>
          <nav className="flex space-x-4 items-center">
            {token ? (
              <>
                <span className="text-sm font-medium hidden sm:block">Chào, {user?.full_name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-200 font-semibold transition-colors">Login</Link>
                <Link to="/register" className="bg-white text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
