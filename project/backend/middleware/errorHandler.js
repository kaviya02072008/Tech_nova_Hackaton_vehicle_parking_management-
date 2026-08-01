// backend/middleware/errorHandler.js
// Single place that turns any thrown error into a consistent JSON response.

const ApiError = require('../utils/ApiError');

// 404 handler - placed after all routes in server.js
const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// Central error handler - must have 4 args for Express to recognize it
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Postgres unique_violation (e.g. duplicate email)
  if (err.code === '23505') {
    statusCode = 409;
    message = 'A record with these details already exists';
  }

  if (!statusCode) statusCode = 500;
  if (!message) message = 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || undefined,
  });
};

module.exports = { notFound, errorHandler };
