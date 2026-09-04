import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FieldDetails from './pages/FieldDetails';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFields from './pages/admin/AdminFields';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* ===================== ADMIN ROUTES ===================== */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="fields" element={<AdminFields />} />
          <Route path="timeslots" element={<div className="p-8"><h1 className="text-3xl font-bold">Quản lý Khung Giờ (Đang xây dựng)</h1></div>} />
          <Route path="bookings" element={<div className="p-8"><h1 className="text-3xl font-bold">Quản lý Booking (Đang xây dựng)</h1></div>} />
          <Route path="users" element={<div className="p-8"><h1 className="text-3xl font-bold">Quản lý Khách Hàng (Đang xây dựng)</h1></div>} />
        </Route>

        {/* ===================== PUBLIC / USER ROUTES ===================== */}
        <Route path="/*" element={
          <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex items-start justify-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/field/:id" element={<FieldDetails />} />
                <Route path="/login" element={
                  <div className="mt-16 w-full flex justify-center"><Login /></div>
                } />
                <Route path="/register" element={
                  <div className="mt-10 w-full flex justify-center"><Register /></div>
                } />
              </Routes>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
