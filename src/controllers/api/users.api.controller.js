const User = require("../../models/user.schema");
const { response } = require("../../utils/utils");
const validate = require("../../utils/validate");

exports.list = async (req, res) => {
  try {
    const { error, value } = validate.listUser.validate(req.query);

    if (error) return res.status(400).json(response(400, error.message));

    const data = await User.find({ isShow: value.isShow }).limit(parseInt(value.pageSize));

    res.status(200).json(response(200, "Lay danh sach nguoi dung thanh cong!", {
      total: data.length,
      users: data,
    })
    );
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.search = async (req, res) => {
  try {
    const { email } = req.query;

    const data = await User.findOne({ email });

    if (!data) return res.status(200).json(response(200, "Người dùng không tồn tại"));

    res.status(200).json(response(200, "Tìm người dùng thành công", { user: data }));
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.insert = async (req, res) => {
  try {
    const { error, value } = validate.insertUser.validate(req.body);
    if (error) return res.status(400).json(response(400, error.message));
    if (req.files.length < 2) return res.status(400).json(response(400, "Cần ít nhất 2 ảnh"));

    const avatars = [];
    for (let index = 0; index < req.files.length; index++) {
      avatars.push("public/data-image/" + req.files[index].filename)
    }

    const dataUser = {
      email: value.email,
      // name: value.name,
      avatars: avatars,
      // hobbies: value.hobbies,
      // birthDay: value.birthDay,
      // gender: value.gender,
      // facilities: value.facilities,
      // specialized: value.specialized,
      // course: value.course,
      // isShow: value.isShow,
    }

    await User.create(dataUser);
    res.status(201).json(response(201, "Tạo tài khoản thành công"))

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};
