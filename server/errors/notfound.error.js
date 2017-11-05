const BaseError = require('./base.error');

class NotFound extends BaseError {
  constructor(message) {
    super(message || 'Not Found', 404);
  }
}

module.exports = NotFound;
