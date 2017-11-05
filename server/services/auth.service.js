const userRepository = require('./../repositories/user.repository');
const authHelpers = require('./../helpers/auth.helpers');
const NotFoundError = require('./../errors/notfound.error');

async function login(username, password) {
  const user = await userRepository.findUserByUserName(username);
  const passwordIsValid = await authHelpers.validatePassword(password, user.password);
  if (!passwordIsValid) {
    throw new NotFoundError();
  }
  return {
    accessToken:
      authHelpers.generateAccessToken(authHelpers.createUserInfo(user.username, user.id)),
  };
}

module.exports = {
  login,
};
