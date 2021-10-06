const userSchema = require('../models/UserSchema');
const { checkEmail, response } = require('../utils/util');

class UserController {

  async insert(req, res, next) {
    try {
      const {
        email,
        name,
        hobbies,
        birthday,
        gender,
        description,
        facilities,
        specialized,
        course,
      } = req.body;
      if (!checkEmail(email.trim())) {
        res.json(response(202, 'Đăng kí thất bại'))
        return;
      }
      const user = {
        email,
        name,
        hobbies,
        birthday,
        gender,
        description,
        facilities,
        specialized,
        course,
      };
      userSchema.create(user, function (err, user) {
        if (err) return res.json(response(500, 'Đã có lỗi xảy ra', err));
        res.json(response(200, 'Thành công', user))
      });

    } catch (error) {
      res.json(response(500, 'Đã có lỗi xảy ra', error))
    }
  }

  async findUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userSchema.findOne({ email });
      res.json(response(200, 'Thành công', user));
    } catch (error) {
      res.json(response(500, 'Đã có lỗi xảy ra', error));
    }
  }
}

module.exports = new UserController();
