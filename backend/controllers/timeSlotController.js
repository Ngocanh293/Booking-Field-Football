const { FieldTimeSlot } = require('../models');

// [Public] Lấy danh sách khung giờ theo field_id
exports.getTimeSlotsByField = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const timeSlots = await FieldTimeSlot.findAll({
      where: { field_id: fieldId }
    });
    res.status(200).json(timeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách khung giờ.' });
  }
};

// [Admin] Thêm khung giờ mới cho một sân
exports.createTimeSlot = async (req, res) => {
  try {
    const { field_id, start_time, end_time } = req.body;

    const newTimeSlot = await FieldTimeSlot.create({
      field_id,
      start_time,
      end_time,
      status: 'AVAILABLE'
    });

    res.status(201).json({ message: 'Tạo khung giờ thành công!', timeSlot: newTimeSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi tạo khung giờ.' });
  }
};

// [Admin] Xóa khung giờ
exports.deleteTimeSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const timeSlot = await FieldTimeSlot.findByPk(id);
    
    if (!timeSlot) {
      return res.status(404).json({ message: 'Không tìm thấy khung giờ.' });
    }

    await timeSlot.destroy();
    res.status(200).json({ message: 'Đã xóa khung giờ.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi xóa khung giờ.' });
  }
};
