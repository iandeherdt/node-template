const BaseError = require('./base.error');

class BadRequest extends BaseError {
  constructor(message) {
    super(message || 'Bad Request', 400);
  }
}

module.exports = BadRequest;
