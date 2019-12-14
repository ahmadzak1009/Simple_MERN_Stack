const Joi = require("@hapi/joi");

const addAdminValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .required(),
    username: Joi.string()
      .required()
      .min(4)
      .max(255),
    password: Joi.string()
      .required()
      .min(4)
      .max(255)
  });
  return schema.validate(data);
};

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .required(),
    username: Joi.string()
      .required()
      .trim()
      .min(4),
    email: Joi.string()
      .email()
      .required()
      .trim(),
    password: Joi.string()
      .required()
      .trim()
      .min(4)
  });
  return schema.validate(data);
};

module.exports.addAdminValidation = addAdminValidation;
module.exports.registerValidation = registerValidation;
