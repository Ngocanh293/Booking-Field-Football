const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// [User Routes] Yêu cầu phải đăng nhập
router.post('/', verifyToken, bookingController.createBooking);
router.get('/my-bookings', verifyToken, bookingController.getMyBookings);
router.put('/:id/cancel', verifyToken, bookingController.cancelMyBooking);

// [Admin Routes] Yêu cầu phải là Admin
router.get('/', verifyToken, isAdmin, bookingController.getAllBookings);
router.put('/:id/status', verifyToken, isAdmin, bookingController.updateBookingStatus);

module.exports = router;
