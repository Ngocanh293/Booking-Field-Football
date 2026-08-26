const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Public routes (Ai cũng xem được)
router.get('/', fieldController.getAllFields);
router.get('/:id', fieldController.getFieldById);

// Admin routes (Chỉ Admin mới có quyền thao tác)
router.post('/', verifyToken, isAdmin, fieldController.createField);
router.put('/:id', verifyToken, isAdmin, fieldController.updateField);
router.delete('/:id', verifyToken, isAdmin, fieldController.deleteField);

module.exports = router;
