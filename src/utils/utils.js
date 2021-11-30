const joi = require("joi");

/** Base Response */
const response = (statusCode, message, data = undefined) => {
  return { statusCode, message, data };
};

/** Validate */
const insertUser = joi.object({
  email: joi.string().email().min(10).max(30).required(),
  name: joi.string().min(5).max(20).required(),
  hobbies: joi.string().required(),
  birthDay: joi.string().required(),
  gender: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
  course: joi.string().required(),
});

const updateUser = joi.object({
  _id: joi.any(),
  description: joi.string().min(10).max(200).required(),
  hobbies: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
});

const checkPassword = joi.object({
  _id: joi.any(),
  passOld: joi.string().required(),
  passNew: joi.string().min(6).max(20).required(),
  passConfirm: joi.string().min(6).max(20).required()
})

const insertReport = joi.object({
  emailReport: joi.string().email().required(),
  emailReported: joi.string().email().required(),
  title: joi.string().required(),
  content: joi.string().min(10).max(200).required()
});

module.exports = { response, insertUser, updateUser, checkPassword, insertReport };
