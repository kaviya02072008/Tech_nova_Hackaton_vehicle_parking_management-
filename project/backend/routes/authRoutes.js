// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();

const { register, login, getMe, changePassword, logout } = require('../controllers/authController');
const validate = require('../middleware/validate');
const protect = require('../middleware/authMiddleware');
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} = require('../validators/authValidators');

// Public routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected routes
router.get('/me', protect, getMe);
router.post('/change-password', protect, validate(changePasswordSchema), changePassword);
router.post('/logout', protect, logout);

module.exports = router;
