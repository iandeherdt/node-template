const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

const algorithm = 'sha512';
const addDays = require('date-fns/add_days');

function validatePassword(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function generateAccessToken(payload, expiresIn) {
  return jwt.sign(
    payload, process.env.JWT_SECRET,
    { expiresIn: expiresIn || process.env.ACCESS_TOKEN_EXPIRATION },
  );
}

function generateRefreshToken() {
  const hash = crypto.createHash(algorithm);
  hash.update(uuidv4());
  return hash.digest('hex');
}

function generateRefreshTokenExpiration() {
  return addDays(new Date(), Number(process.env.REFRESH_TOKEN_EXPIRATION)).toISOString();
}

function createUserInfo(username, id) {
  return {
    username, id,
  };
}

function decode(token) {
  return jwt.decode(token);
}

function verify(token) {
  return new Promise((resolve, reject) => jwt.verify(
    token, process.env.JWT_SECRET,
    (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    },
  ));
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateRefreshTokenExpiration,
  createUserInfo,
  decode,
  verify,
  validatePassword,
};
