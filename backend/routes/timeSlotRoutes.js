const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/timeSlotController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Public route: Lấy khung giờ của 1 sân cụ thể
router.get('/field/:fieldId', timeSlotController.getTimeSlotsByField);

// Admin routes: Thêm, xóa khung giờ
router.post('/', verifyToken, isAdmin, timeSlotController.createTimeSlot);
router.delete('/:id', verifyToken, isAdmin, timeSlotController.deleteTimeSlot);

module.exports = router;
