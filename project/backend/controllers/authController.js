// backend/controllers/authController.js
// Thin HTTP layer - validates via middleware, delegates to authService,
// and shapes consistent JSON responses.

const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  const { user, token } = await authService.register({ fullName, email, phone, password });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: { user, token },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login({ email, password });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { user, token },
  });
});

const getMe = asyncHandler(async (req, res) => {
  // req.user is already populated by the `protect` middleware
  res.status(200).json({
    success: true,
    data: { user: req.user },
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.id, currentPassword, newPassword);

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

const logout = asyncHandler(async (req, res) => {
  // JWT is stateless - logout is handled client-side by discarding the token.
  // Endpoint exists for a consistent API surface and future blacklist support.
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

module.exports = { register, login, getMe, changePassword, logout };
