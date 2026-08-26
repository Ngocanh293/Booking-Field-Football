const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Đăng ký người dùng mới
exports.register = async (req, res) => {
  try {
    const { full_name, email, password, phone } = req.body;

    // Kiểm tra xem email đã được sử dụng chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng.' });
    }

    // Mã hóa mật khẩu (Hashing)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới trong Database
    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
      role: 'USER', // Mặc định người đăng ký mới là User
      status: 'ACTIVE'
    });

    res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      user: {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm kiếm user theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email không tồn tại.' });
    }

    // Kiểm tra mật khẩu có khớp với mật khẩu đã mã hóa trong DB không
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không chính xác.' });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ message: 'Tài khoản của bạn đã bị khóa.' });
    }

    // Nếu thông tin đúng, tạo ra chìa khóa Token (JWT)
    const payload = {
      id: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d' // Token có giá trị trong 1 ngày
    });

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
  }
};
