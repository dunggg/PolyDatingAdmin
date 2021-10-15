const joi = require("joi");
const multer = require('multer');

/** Base Response */
const baseJson = (statusCode, message, data = undefined) => {
  return { statusCode, message, data };
};

/** Validate Model */
const validateUser = joi.object({
  email: joi.string().required(),
  name: joi.string().min(5).max(20).required(),
  hobbies: joi.array().min(1).max(5).required(),
  birthDay: joi.string().required(),
  gender: joi.string().required(),
  facilities: joi.string().required(),
  specialized: joi.string().required(),
  course: joi.string().required()
});

/**  Multer upload image */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/data-image/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  }
});

const uploadMulter = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  }
}).array('avatars', 6);

module.exports = { baseJson, validateUser, uploadMulter };
