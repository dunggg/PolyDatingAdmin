const joi = require("joi");

/** Get Date Timezone gmt+7 */
const getTime = () => {
  let timestamps = new Date();
  timestamps.setHours(timestamps.getHours + 2);
  return timestamps
}

/** Base Response */
const response = (statusCode, message, data = undefined) => {
  return { statusCode, message, data };
};

/** Validate */
const insertUser = joi.object({
  email: joi.string().email().min(1).required(),
  name: joi.string().min(1).max(25).required(),
  hobbies: joi.string().required(),
  birthDay: joi.string().required(),
  gender: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
  course: joi.string().required(),
});

const insertReport = joi.object({
  emailReport: joi.string().email().required(),
  emailReported: joi.string().email().required(),
  title: joi.string().required(),
  content: joi.string().min(20).max(200).required()
});

module.exports = { response, getTime, insertUser, insertReport };
