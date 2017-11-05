const express = require('express');
const controller = require('./../controllers/auth.controller');
const validation = require('express-validation');
const loginValidationRules = require('./../validations/auth.validation');

const router = express.Router();

router.post('/login', validation(loginValidationRules), controller.login);

module.exports = router;
