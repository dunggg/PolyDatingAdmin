const joi = require("joi");

/** Base Response */

//200: Pass
//500: Error
//404: Not Found
//400: Fail, Field Required, Account Blocked, Min Images

const response = (statusCode, status, message, data = undefined) => {
  return { statusCode, status, message, data };
};

/** Validate */
//API
const insertUser = joi.object({
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

const updateUser = joi.object({
  description: joi.string().min(10).max(200).required(),
  hobbies: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
});

const insertReport = joi.object({
  emailReceiver: joi.string().email().required(),
  title: joi.string().required(),
  content: joi.string().min(10).max(200).required()
});

//Website
const signIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

const signUp = joi.object({
  email: joi.string().email().min(10).max(50).required(),
  password: joi.string().min(6).required(),
  name: joi.string().min(5).max(20).required()
});

module.exports = {
  response,
  insertUser,
  updateUser,
  insertReport,
  signIn,
  signUp
};
