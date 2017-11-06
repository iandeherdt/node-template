const userService = require('../services/user.service');

async function add(req, res, next) {
  try {
    const result = await userService.add(req.body);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
}

module.exports = {
  add,
};
