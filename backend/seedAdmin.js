const bcrypt = require('bcrypt');
const { User } = require('./models'); // Nạp Model User

async function seedAdmin() {
  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Tìm hoặc tạo tài khoản
    const [admin, created] = await User.findOrCreate({
      where: { email: 'admin@gmail.com' },
      defaults: {
        full_name: 'Super Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        phone: '0999999999',
        role: 'ADMIN'
      }
    });

    if (!created) {
      // Nếu tài khoản đã tồn tại, cập nhật nó thành ADMIN
      await admin.update({ role: 'ADMIN', password: hashedPassword });
      console.log('✅ Tài khoản admin@gmail.com đã tồn tại, đã được ép lên quyền ADMIN.');
    } else {
      console.log('✅ Đã tạo THÀNH CÔNG tài khoản ADMIN mới tinh!');
    }
    
    console.log('====================================');
    console.log('📧 Email đăng nhập : admin@gmail.com');
    console.log('🔑 Mật khẩu        : admin123');
    console.log('====================================');
    
    process.exit(0); // Thoát chương trình thành công
  } catch (error) {
    console.error('❌ Lỗi khi tạo Admin:', error);
    process.exit(1);
  }
}

seedAdmin();
