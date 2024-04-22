const { BaseResponse } = require('../common');

class ErrorResponse extends BaseResponse {
  constructor(status, message, error) {
    super(status, false, message);
    this.error = error;
  }

  removeError() {
    delete this.error;
  }

  formatError() {
    if (this.error && this.error instanceof Error) {
      return {
        name: this.error.name,
        message: this.error.message,
        stack: this.error.stack,
      };
    }
    return this.error;
  }

  format() {
    return {
      success: this.success,
      message: this.message,
      error: this.formatError(),
    };
  }
}

module.exports = ErrorResponse;
