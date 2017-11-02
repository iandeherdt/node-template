const authService = require('../services/auth.service');

async function login(req, res, next) {
  try {
    const { email, deviceId, password } = req.body;
    const result = await authService.login(email, deviceId, password);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
}

module.exports = {
  login,
};
