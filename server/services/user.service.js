const userRepository = require('./../repositories/user.repository');
const BadRequestError = require('./../errors/badrequest.error');
const emailHelper = require('../helpers/email.helpers');
const authHelper = require('../helpers/auth.helpers');

async function add(user) {
  const dbUser = await userRepository.userExists(user.username);
  if (dbUser) {
    throw new BadRequestError('cannot insert duplicate user.');
  }
  const hash = authHelper.hashPassword(user.password);
  const newUser = Object.assign({}, user, { password: hash });
  delete newUser.confirmPassword;
  await userRepository.add(newUser);
  const token = authHelper.generateAccessToken(authHelper.createUserInfo(user.username, user.id), '12h');
  await emailHelper.send({
    from: 'ian.de.herdt@telenet.be',
    to: user.username,
    subject: 'Activate your account',
    html: `<span>follow this link to activate your account: ${process.env.SERVICE_URL}/activateaccount?token=${token}</span>`,
  });
}

async function update(userId, user) {
  const dbUser = await userRepository.findById(userId);
  const newUser = Object.assign({}, dbUser, user);
  return userRepository.update(userId, newUser);
}

module.exports = {
  add,
  update,
};
