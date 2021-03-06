const Joi = require('joi');

module.exports = {
  body: {
    username: Joi.string().email(),
    name: Joi.string().min(1).max(100).required(),
    firstname: Joi.string().min(1).max(100).required(),
    password: Joi.string().min(6).max(100).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).options({
      language: {
        any: {
          allowOnly: 'Passwords and confirm password are not identical',
        },
      },
    }),
    admin: Joi.boolean(),
    addressName: Joi.string(),
    street: Joi.string().required(),
    house: Joi.string().min(1).max(5).required(),
    bus: Joi.string().not().required(),
    postal: Joi.string().min(1).max(10).required(),
    city: Joi.string().min(1).max(100).required(),
    country: Joi.string().min(1).max(100).required(),
  },
};
