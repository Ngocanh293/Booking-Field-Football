const jwt = require('jsonwebtoken');

// Middleware xác thực người dùng đã đăng nhập chưa
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Không tìm thấy Token. Yêu cầu đăng nhập!' });
  }

  try {
    // Thông thường token có dạng "Bearer <token_string>"
    const tokenString = token.split(' ')[1];
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user (id, role) vào req để các controller sau dùng
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

// Middleware kiểm tra quyền Admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ message: 'Bạn không có quyền Admin để thực hiện thao tác này!' });
  }
};
