const authService = require('../services/auth.service');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
}

module.exports = {
  login,
};
