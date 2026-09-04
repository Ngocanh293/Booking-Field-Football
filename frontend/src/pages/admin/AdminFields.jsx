import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminFields = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price_per_hour: '',
    description: '',
    image_url: '',
    field_type: '5' // Mặc định sân 5
  });

  // Lấy danh sách sân
  const fetchFields = async () => {
    try {
      const response = await api.get('/fields');
      setFields(response.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách sân:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/fields', formData);
      alert('Thêm sân thành công!');
      setShowModal(false);
      setFormData({ name: '', address: '', price_per_hour: '', description: '', image_url: '', field_type: '5' });
      fetchFields(); // Load lại danh sách
    } catch (error) {
      alert(error.response?.data?.message || 'Có lỗi khi thêm sân');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sân này?')) {
      try {
        await api.delete(`/fields/${id}`);
        alert('Xóa sân thành công!');
        fetchFields();
      } catch (error) {
        alert('Lỗi khi xóa sân. Có thể sân này đang có người đặt.');
      }
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Quản lý Sân Bóng</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition-colors flex items-center gap-2"
        >
          <span>➕</span> Thêm Sân Mới
        </button>
      </div>

      {/* Bảng danh sách sân */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 font-medium">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">Tên Sân</th>
                  <th className="p-4 font-semibold">Loại</th>
                  <th className="p-4 font-semibold">Giá / Giờ</th>
                  <th className="p-4 font-semibold">Địa chỉ</th>
                  <th className="p-4 font-semibold text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fields.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">Chưa có sân bóng nào. Hãy thêm mới!</td>
                  </tr>
                ) : (
                  fields.map((field) => (
                    <tr key={field.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-gray-800 flex items-center gap-3">
                        {field.image_url ? (
                          <img src={field.image_url} alt={field.name} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">🏟️</div>
                        )}
                        {field.name}
                      </td>
                      <td className="p-4"><span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded">Sân {field.field_type}</span></td>
                      <td className="p-4 font-semibold text-green-600">{field.price_per_hour.toLocaleString('vi-VN')} đ</td>
                      <td className="p-4 text-gray-600 truncate max-w-xs">{field.address}</td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleDelete(field.id)}
                          className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors font-semibold text-sm"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Thêm Sân */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">Thêm Sân Bóng Mới</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 text-2xl font-bold leading-none transition-colors">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tên Sân</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" placeholder="VD: Sân Hàng Đẫy" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Loại Sân</label>
                  <select name="field_type" value={formData.field_type} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="5">Sân 5 người</option>
                    <option value="7">Sân 7 người</option>
                    <option value="11">Sân 11 người</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Giá Thuê / Giờ (VNĐ)</label>
                  <input type="number" name="price_per_hour" required value={formData.price_per_hour} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" placeholder="VD: 300000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Link Ảnh (Không bắt buộc)</label>
                  <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" placeholder="https://..." />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors">Hủy</button>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition-colors">Lưu Sân Bóng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFields;
