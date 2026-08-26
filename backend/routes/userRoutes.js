const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// [User Routes]
router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, userController.updateProfile);

// [Admin Routes]
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

module.exports = router;
