// backend/models/userModel.js
// Data access layer for the users table. Controllers/services never
// write raw SQL directly - everything funnels through this model.

const { query } = require('../config/db');

const userModel = {
  async create({ fullName, email, phone, passwordHash, role }) {
    const sql = `
      INSERT INTO users (full_name, email, phone, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, full_name, email, phone, role, is_active, created_at
    `;
    const { rows } = await query(sql, [fullName, email, phone, passwordHash, role]);
    return rows[0];
  },

  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
    const { rows } = await query(sql, [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const sql = `
      SELECT id, full_name, email, phone, role, is_active, created_at
      FROM users WHERE id = $1 LIMIT 1
    `;
    const { rows } = await query(sql, [id]);
    return rows[0] || null;
  },

  async updatePassword(id, passwordHash) {
    const sql = `UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING id`;
    const { rows } = await query(sql, [passwordHash, id]);
    return rows[0] || null;
  },

  async updateProfile(id, { fullName, phone }) {
    const sql = `
      UPDATE users SET full_name = $1, phone = $2
      WHERE id = $3
      RETURNING id, full_name, email, phone, role, is_active, created_at
    `;
    const { rows } = await query(sql, [fullName, phone, id]);
    return rows[0] || null;
  },
};

module.exports = userModel;
