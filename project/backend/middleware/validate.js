// backend/middleware/validate.js
// Generic Zod validation middleware - pass it a Zod schema and it will
// validate req.body, attach the parsed result back onto req.body, and
// forward a clean 400 error on failure.

const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return next(new ApiError(400, 'Validation failed', details));
  }

  req.body = result.data;
  next();
};

module.exports = validate;
