const userSchema = require('../models/UserSchema');

function checkEmail(email) {
    var re = /\S+(@fpt.edu.vn)$/;
    return re.test(String(email).toLowerCase());
}

// async function emptyUser(email) {
//     try {
//         const user = await userSchema.findOne({ email });
//         return user
//     } catch (error) {
//         return false
//     }
// }

function response(status, message, data = undefined) {
    return { status, message, data };
}

module.exports = { checkEmail, response };
