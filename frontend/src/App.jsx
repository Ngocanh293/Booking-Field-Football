import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Placeholder Header */}
        <header className="bg-green-600 text-white p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Football Field Booking</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex items-center justify-center p-6">
          <Routes>
            <Route path="/" element={<h2 className="text-xl text-gray-700 font-semibold">Trang Chủ (Sắp hoàn thiện)</h2>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
