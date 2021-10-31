const User = require("../../models/user.schema");
const { response } = require("../../utils/utils");
const validate = require("../../utils/validate");

exports.list = async (req, res) => {
  try {
    const { error, value } = validate.listUser.validate(req.query);

    if (error) return res.status(400).json(response(400, error.message));

    const data = await User.find({ isShow: value.isShow }).limit(parseInt(value.pageSize));

    res.status(200).json(response(200, "Lấy danh sách người dùng thành công", {
      total: data.length,
      users: data
    }));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.search = async (req, res) => {
  try {
    const { email } = req.params;

    const data = await User.findOne({ email });

    if (!data) return res.status(200).json(response(200, "Người dùng không tồn tại", data));

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

    console.log(value.hobbies);

    const dataUser = {
      email: value.email,
      password: null,
      name: value.name,
      avatars: avatars,
      hobbies: value.hobbies,
      birthDay: value.birthDay,
      gender: value.gender,
      description: "Không có gì để hiển thị",
      facilities: value.facilities,
      specialized: value.specialized,
      course: value.course,
      isShow: value.isShow,
      isActive: "Kích hoạt",
      status: "Online",
      role: "User"
    }

    await User.create(dataUser);
    res.status(201).json(response(201, "Tạo tài khoản thành công"))

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.delete = async (req, res) => {
  try {
    const { _id } = req.params;

    const data = await User.findOne({ _id });

    if (!data) return res.status(200).json(response(200, "Người dùng không tồn tại"));

    await User.findByIdAndDelete({ _id: data._id });
    res.status(200).json(response(200, "Xóa người dùng thành công"));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};
