// backend/middleware/roleMiddleware.js
// Restricts a route to one or more roles. Use after `protect`.
// Example: router.get('/admin-only', protect, authorize('ADMIN'), handler)

const ApiError = require('../utils/ApiError');

const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, 'Not authorized');
  }
  if (!allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, 'Forbidden: insufficient role permissions');
  }
  next();
};

module.exports = authorize;
