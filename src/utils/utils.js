const multer = require('multer');

/** Base Response */
const response = (statusCode, message, data = undefined) => {
  return { statusCode, message, data };
};

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

module.exports = { response, uploadMulter };
