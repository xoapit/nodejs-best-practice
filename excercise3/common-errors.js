const AppError = require("./error-final");

class NotFoundError extends AppError {
  constructor(innerException = null, ...params) {
    super(
      "NOT_FOUND_ERROR",
      404,
      "The requested resource cannot be found.",
      true,
      innerException,
      params
    );
  }
}

module.exports = {
  NotFoundError,
};
