# Football Field Booking System

Hệ thống đặt sân bóng trực tuyến, giúp người dùng dễ dàng tìm kiếm sân, xem lịch trống, và đặt sân. Đồng thời cung cấp công cụ quản lý toàn diện cho chủ sân (Admin).

## I. Công Nghệ Sử Dụng (Tech Stack)

Dự án được xây dựng dựa trên mô hình Client-Server với các công nghệ hiện đại:

**Frontend:**
- **Thư viện/Framework:** React (Vite)
- **Ngôn ngữ:** JavaScript
- **Styling:** CSS / Tailwind CSS (Dự kiến)

**Backend:**
- **Môi trường:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize
- **Cơ sở dữ liệu (Database):** PostgreSQL
- **Bảo mật & Xác thực:** JWT (JSON Web Token), bcrypt

## II. Cấu Trúc Thư Mục (Folder Structure)

Dự án được tổ chức theo mô hình Monorepo (chứa cả front-end và back-end trong cùng một repo) để dễ quản lý:

```text
Booking-Field-Football/
├── backend/                  # Chứa toàn bộ mã nguồn của Server
│   ├── config/               # Cấu hình kết nối DB (Sequelize)
│   ├── controllers/          # (Sắp tạo) Xử lý logic API
│   ├── migrations/           # Quản lý sự thay đổi cấu trúc bảng trong DB
│   ├── models/               # Định nghĩa các Schema/Bảng (User, Field, Booking...)
│   ├── routes/               # (Sắp tạo) Định nghĩa các đường dẫn (endpoints) API
│   ├── seeders/              # Dữ liệu mẫu cho DB
│   ├── .env                  # Lưu trữ các biến môi trường bảo mật (PORT, DB_PASSWORD...)
│   ├── package.json          # Quản lý các thư viện Node.js của Backend
│   └── server.js             # Entry point (file khởi chạy) của Backend
│
├── frontend/                 # Chứa toàn bộ mã nguồn của Client (Web UI)
│   ├── public/               # Tài nguyên công khai (hình ảnh, favicon...)
│   ├── src/                  # Mã nguồn chính của React (Components, Pages, Assets)
│   ├── package.json          # Quản lý các thư viện của Frontend
│   └── vite.config.js        # Cấu hình build của Vite
│
└── .gitignore                # Chứa danh sách các file/thư mục không đẩy lên Git
```

## III. Mục Tiêu Dự Án
Hệ thống giải quyết các vấn đề truyền thống trong việc đặt sân bóng:
- Loại bỏ việc phải gọi điện/nhắn tin thủ công để hỏi tình trạng sân.
- Giúp chủ sân quản lý lịch đặt sân dễ dàng, tránh trùng lịch hoặc nhầm giờ.
- Theo dõi trạng thái booking một cách rõ ràng.
- Cung cấp công cụ quản lý sân, người dùng, lịch đặt cho Admin.

## IV. Các Loại Người Dùng và Chức Năng

Hệ thống có 2 vai trò chính: **User** (Khách hàng) và **Admin** (Quản trị viên/Chủ sân).

### 1. Chức năng của User
- **Tài khoản**: Đăng ký, đăng nhập, đăng xuất, xem/cập nhật thông tin cá nhân.
- **Sân bóng**: Xem danh sách sân, tìm kiếm, lọc, xem chi tiết (địa chỉ, giá, loại sân).
- **Đặt sân**: Chọn sân, ngày, khung giờ, gửi yêu cầu đặt sân, hủy booking.
- **Lịch sử**: Xem danh sách các booking đã đặt, theo dõi trạng thái.

### 2. Chức năng của Admin
- **Dashboard**: Thống kê số lượng sân, người dùng, tổng số booking.
- **Quản lý Sân bóng**: Thêm, sửa, xóa, Bật/Tắt hoạt động.
- **Quản lý Khung giờ**: Tạo, cập nhật, xóa, quản lý trạng thái khung giờ.
- **Quản lý Booking**: Xem danh sách, xác nhận, hủy, hoàn thành trận đấu.
- **Quản lý User**: Xem danh sách người dùng.

## V. Quy Trình và Trạng Thái Booking
1. **PENDING**: Booking vừa tạo, chờ Admin xác nhận.
2. **CONFIRMED**: Admin đã xác nhận, khung giờ được giữ cho User.
3. **CANCELLED**: Bị hủy bởi User/Admin, hoặc do lỗi thông tin/sân không khả dụng.
4. **COMPLETED**: Trận đấu đã diễn ra xong.

## VI. Cấu Trúc Database (ERD)

**1. Bảng `users`**
- `id`, `full_name`, `email`, `password`, `phone`, `role`, `status`, `created_at`, `updated_at`

**2. Bảng `fields`** (Sân bóng)
- `id`, `name`, `description`, `address`, `field_type`, `price_per_hour`, `image_url`, `status`, `created_at`, `updated_at`

**3. Bảng `field_time_slots`** (Khung giờ)
- `id`, `field_id`, `start_time`, `end_time`, `status`, `created_at`, `updated_at`

**4. Bảng `bookings`** (Lịch đặt)
- `id`, `user_id`, `field_id`, `booking_date`, `start_time`, `end_time`, `total_price`, `status`, `note`, `created_at`, `updated_at`

## VII. Hướng Dẫn Cài Đặt (Getting Started)
*(Phần này sẽ được cập nhật chi tiết sau khi dự án hoàn thành)*
