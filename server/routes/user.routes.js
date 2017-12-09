const express = require('express');
const controller = require('./../controllers/user.controller');
const validation = require('express-validation');
const userValidationRules = require('./../validations/user.validation');
const userUpdateValidationRules = require('./../validations/user-update.validation');

const router = express.Router();

router.post('/', validation(userValidationRules), controller.add);
router.put('/', validation(userUpdateValidationRules), controller.update);

module.exports = router;
