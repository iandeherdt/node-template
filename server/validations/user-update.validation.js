const Joi = require('joi');

module.exports = {
  body: {
    username: Joi.string().email(),
    name: Joi.string().min(1).max(100).required(),
    firstname: Joi.string().min(1).max(100).required(),
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
