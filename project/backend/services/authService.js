// backend/services/authService.js
// Business logic for authentication - keeps controllers thin.

const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');

const SALT_ROUNDS = 10;
const ALLOWED_ROLES = ['CUSTOMER', 'SECURITY', 'ADMIN'];

const authService = {
  async register({ fullName, email, phone, password, role }) {
    const existing = await userModel.findByEmail(email);
    if (existing) {
      throw new ApiError(409, 'An account with this email already exists');
    }

    // Public self-registration is only ever allowed as CUSTOMER.
    // SECURITY / ADMIN accounts must be created by an Admin (future module).
    const safeRole = role === 'CUSTOMER' || !role ? 'CUSTOMER' : null;
    if (!safeRole) {
      throw new ApiError(403, 'Self-registration is only allowed for the CUSTOMER role');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.create({
      fullName,
      email,
      phone,
      passwordHash,
      role: safeRole,
    });

    const token = generateToken(user);
    return { user, token };
  },

  async login({ email, password }) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    if (!user.is_active) {
      throw new ApiError(403, 'This account has been deactivated');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = generateToken(user);
    const { password_hash, ...safeUser } = user;
    return { user: safeUser, token };
  },

  async getProfile(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  },

  async changePassword(userId, currentPassword, newPassword) {
    const { query } = require('../config/db');
    const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
    const record = result.rows[0];
    if (!record) throw new ApiError(404, 'User not found');

    const isMatch = await bcrypt.compare(currentPassword, record.password_hash);
    if (!isMatch) throw new ApiError(401, 'Current password is incorrect');

    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await userModel.updatePassword(userId, newHash);
    return true;
  },
};

module.exports = authService;
