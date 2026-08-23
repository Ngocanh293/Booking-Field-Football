# Football Field Booking System

Hệ thống đặt sân bóng trực tuyến, giúp người dùng dễ dàng tìm kiếm sân, xem lịch trống, và đặt sân. Đồng thời cung cấp công cụ quản lý toàn diện cho chủ sân (Admin).

## I. Mục Tiêu Dự Án
Hệ thống giải quyết các vấn đề truyền thống trong việc đặt sân bóng:
- Loại bỏ việc phải gọi điện/nhắn tin thủ công để hỏi tình trạng sân.
- Giúp chủ sân quản lý lịch đặt sân dễ dàng, tránh trùng lịch hoặc nhầm giờ.
- Theo dõi trạng thái booking một cách rõ ràng.
- Cung cấp công cụ quản lý sân, người dùng, lịch đặt cho Admin.

**Các tính năng cốt lõi:**
- Người dùng: Đăng ký, đăng nhập, tìm kiếm & xem chi tiết sân, đặt sân theo khung giờ, quản lý lịch sử đặt.
- Admin: Quản lý sân, khung giờ, xác nhận/hủy/cập nhật trạng thái booking, quản lý người dùng.

## II. Các Loại Người Dùng và Chức Năng

Hệ thống có 2 vai trò chính: **User** (Khách hàng) và **Admin** (Quản trị viên/Chủ sân).

### 1. Chức năng của User
- **Tài khoản**: Đăng ký, đăng nhập, đăng xuất, xem/cập nhật thông tin cá nhân.
- **Sân bóng**:
  - Xem danh sách sân.
  - Tìm kiếm theo tên, lọc theo loại sân, khu vực, giá.
  - Xem chi tiết sân (Tên, địa chỉ, mô tả, giá, loại sân 5/7/11, hình ảnh, giờ hoạt động, trạng thái).
- **Đặt sân**:
  - Chọn sân, ngày, khung giờ.
  - Xem tổng tiền và gửi yêu cầu đặt sân.
  - Hủy booking (nếu đủ điều kiện).
- **Lịch sử**:
  - Xem danh sách và chi tiết các booking đã đặt.
  - Theo dõi trạng thái (PENDING, CONFIRMED, CANCELLED, COMPLETED).

### 2. Chức năng của Admin
- **Dashboard**: Thống kê tổng quan (số sân, số user, số booking, booking chờ xác nhận).
- **Quản lý Sân bóng**: Thêm, sửa, xóa, Bật/Tắt hoạt động, quản lý giá và loại sân.
- **Quản lý Khung giờ**: Tạo, cập nhật, xóa, kiểm tra tình trạng khung giờ.
- **Quản lý Booking**: Xem danh sách/chi tiết, xác nhận, hủy, hoàn thành (COMPLETED).
- **Quản lý User**: Xem danh sách và chi tiết người dùng.

## III. Quy Trình và Trạng Thái Booking
Mỗi lượt đặt sân sẽ đi qua các trạng thái:
1. **PENDING**: Booking vừa tạo, chờ Admin xác nhận.
2. **CONFIRMED**: Admin đã xác nhận, khung giờ được giữ cho User.
3. **CANCELLED**: Bị hủy bởi User/Admin, hoặc do lỗi thông tin/sân không khả dụng.
4. **COMPLETED**: Trận đấu đã diễn ra, Admin cập nhật sau khi kết thúc.

## IV. Cấu Trúc Database (ERD)

**1. Bảng `users`**
- `id`
- `full_name`
- `email`
- `password`
- `phone`
- `role` (User/Admin)
- `status`
- `created_at`, `updated_at`

**2. Bảng `fields`** (Sân bóng)
- `id`
- `name`
- `description`
- `address`
- `field_type`
- `price_per_hour`
- `image_url`
- `status`
- `created_at`, `updated_at`

**3. Bảng `field_time_slots`** (Khung giờ)
- `id`
- `field_id`
- `start_time`
- `end_time`
- `status`
- `created_at`, `updated_at`

**4. Bảng `bookings`** (Lịch đặt)
- `id`
- `user_id`
- `field_id`
- `booking_date`
- `start_time`
- `end_time`
- `total_price`
- `status` (PENDING/CONFIRMED/CANCELLED/COMPLETED)
- `note`
- `created_at`, `updated_at`
