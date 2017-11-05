const authService = require('../services/auth.service');
const authHelpers = require('./../helpers/auth.helpers');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
}

function redirectFacebook(req, res, next) {
  try {
    const userInfo = authHelpers.createTokenInfo(req.user);
    const token = authHelpers.generateAccessToken(userInfo);
    // Successful authentication, redirect to success page to pass token.
    return res.redirect(`/authComplete?token=${token}&id=${req.user.id}&user=${req.user.name}&registered=${!!req.user.registered}`);
  } catch (ex) {
    return next(ex);
  }
}

module.exports = {
  login,
  redirectFacebook,
};
