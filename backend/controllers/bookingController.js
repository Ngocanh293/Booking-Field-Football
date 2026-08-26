const { Booking, Field, User, FieldTimeSlot } = require('../models');

// [User] Gửi yêu cầu đặt sân
exports.createBooking = async (req, res) => {
  try {
    const { field_id, booking_date, start_time, end_time, total_price, note } = req.body;
    const user_id = req.user.id; // Lấy từ middleware xác thực

    // TODO: Có thể kiểm tra thêm logic xem khung giờ này đã có ai đặt (status=CONFIRMED) trong cùng ngày chưa
    
    const newBooking = await Booking.create({
      user_id,
      field_id,
      booking_date,
      start_time,
      end_time,
      total_price,
      status: 'PENDING', // Trạng thái mặc định
      note
    });

    res.status(201).json({ message: 'Gửi yêu cầu đặt sân thành công. Vui lòng chờ xác nhận!', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi đặt sân.' });
  }
};

// [User] Xem lịch sử đặt sân của chính mình
exports.getMyBookings = async (req, res) => {
  try {
    const user_id = req.user.id;

    const bookings = await Booking.findAll({
      where: { user_id },
      include: [{ model: Field, attributes: ['name', 'address', 'image_url'] }],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy lịch sử đặt sân.' });
  }
};

// [User] Hủy đặt sân (Chỉ hủy được khi trạng thái đang PENDING)
exports.cancelMyBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const booking = await Booking.findOne({ where: { id, user_id } });

    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy booking.' });
    }

    if (booking.status !== 'PENDING') {
      return res.status(400).json({ message: 'Bạn chỉ có thể hủy sân khi đang ở trạng thái chờ xác nhận.' });
    }

    booking.status = 'CANCELLED';
    await booking.save();

    res.status(200).json({ message: 'Hủy đặt sân thành công.', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi hủy sân.' });
  }
};

// [Admin] Xem danh sách toàn bộ booking của hệ thống
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['full_name', 'phone', 'email'] },
        { model: Field, attributes: ['name'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách booking.' });
  }
};

// [Admin] Thay đổi trạng thái Booking (Xác nhận, Hủy, Hoàn thành)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // status: PENDING, CONFIRMED, CANCELLED, COMPLETED

    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
    }

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy booking.' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: `Cập nhật trạng thái thành ${status} thành công!`, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái.' });
  }
};
