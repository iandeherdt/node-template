const express = require('express');
const controller = require('./../controllers/auth.controller');
const validation = require('express-validation');
const loginValidationRules = require('./../validations/auth.validation');
const facebookStrategy = require('./../passport/facebook.strategy');

const router = express.Router();

router.post('/login', validation(loginValidationRules), controller.login);

router.get('/login/facebook', facebookStrategy.authenticate('facebook'));

router.get(
  '/login/facebook/callback',
  facebookStrategy.authenticate('facebook', { failureRedirect: '/login' }),
  controller.redirectFacebook,
);

module.exports = router;
