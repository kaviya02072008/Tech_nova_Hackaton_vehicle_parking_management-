// backend/middleware/authMiddleware.js
// Verifies the JWT from the Authorization header and attaches the
// decoded user payload to req.user for downstream handlers.

const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const userModel = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, 'Not authorized, token invalid or expired');
  }

  const user = await userModel.findById(decoded.id);
  if (!user || !user.is_active) {
    throw new ApiError(401, 'Not authorized, user no longer active');
  }

  req.user = user; // { id, full_name, email, phone, role, is_active, created_at }
  next();
});

module.exports = protect;
