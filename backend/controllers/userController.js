const { User } = require('../models');

// [User] Xem thông tin cá nhân
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // Không trả về mật khẩu
    });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin người dùng.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin cá nhân.' });
  }
};

// [User] Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    const { full_name, phone } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin người dùng.' });
    }

    await user.update({ full_name, phone });

    res.status(200).json({ 
      message: 'Cập nhật thông tin thành công!', 
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật thông tin.' });
  }
};

// [Admin] Lấy danh sách toàn bộ Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng.' });
  }
};
