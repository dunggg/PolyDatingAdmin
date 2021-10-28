/** Base Response */
const response = (statusCode, message, data = undefined) => {
  return { statusCode, message, data };
};

module.exports = { response };
