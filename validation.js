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

module.exports.addAdminValidation = addAdminValidation;
