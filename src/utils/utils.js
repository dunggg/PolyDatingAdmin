const joi = require("joi");

/** Base Response */
const baseJson = (statusCode, message, data = undefined) => {
  return { statusCode, message, data };
};

/** Validate Model */
const validateUser = joi.object({
  email: joi.string().required(),
  name: joi.string().min(5).max(20).required(),
  avatars: joi.array().min(2).max(6).required(),
  hobbies: joi.array().min(1).max(5).required(),
  birthDay: joi.string().required(),
  gender: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
  course: joi.string().required()
});

module.exports = { baseJson, validateUser };
