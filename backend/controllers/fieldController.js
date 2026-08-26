const { Field, FieldTimeSlot } = require('../models');

// [Public] Lấy danh sách tất cả sân bóng
exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.findAll({
      where: { status: 'ACTIVE' } // Chỉ hiển thị sân đang hoạt động
    });
    res.status(200).json(fields);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách sân.' });
  }
};

// [Public] Lấy thông tin chi tiết một sân (kèm các khung giờ của sân đó)
exports.getFieldById = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await Field.findOne({
      where: { id },
      include: [{
        model: FieldTimeSlot,
        attributes: ['id', 'start_time', 'end_time', 'status']
      }]
    });

    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân bóng.' });
    }
    res.status(200).json(field);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin sân.' });
  }
};

// [Admin] Thêm sân bóng mới
exports.createField = async (req, res) => {
  try {
    const { name, description, address, field_type, price_per_hour, image_url } = req.body;
    
    const newField = await Field.create({
      name,
      description,
      address,
      field_type,
      price_per_hour,
      image_url,
      status: 'ACTIVE'
    });

    res.status(201).json({ message: 'Thêm sân bóng thành công!', field: newField });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi thêm sân bóng.' });
  }
};

// [Admin] Cập nhật thông tin sân bóng
exports.updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address, field_type, price_per_hour, image_url, status } = req.body;

    const field = await Field.findByPk(id);
    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân bóng.' });
    }

    await field.update({
      name, description, address, field_type, price_per_hour, image_url, status
    });

    res.status(200).json({ message: 'Cập nhật sân bóng thành công!', field });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật sân bóng.' });
  }
};

// [Admin] Xóa sân bóng
exports.deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await Field.findByPk(id);
    if (!field) {
      return res.status(404).json({ message: 'Không tìm thấy sân bóng.' });
    }

    await field.destroy();
    res.status(200).json({ message: 'Đã xóa sân bóng.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi xóa sân bóng.' });
  }
};
