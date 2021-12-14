let joi = require("joi");

/** Base Response */
let response = (statusCode, message, data = undefined) => {
  return { statusCode, message, data };
};

/** Validate */
let insertUser = joi.object({
  email: joi.string().email().min(10).max(50).required(),
  name: joi.string().min(5).max(20).required(),
  hobbies: joi.string().required(),
  birthDay: joi.string().required(),
  gender: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
  course: joi.string().required(),
  token: joi.string().required()
});

let updateUser = joi.object({
  description: joi.string().min(10).max(200).required(),
  hobbies: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
});

let insertReport = joi.object({
  emailReceiver: joi.string().email().required(),
  title: joi.string().required(),
  content: joi.string().min(10).max(200).required()
});

module.exports = {
  response,
  insertUser,
  updateUser,
  insertReport
};
