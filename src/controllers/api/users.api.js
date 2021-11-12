const User = require("../../models/user.schema");
const { response } = require("../../utils/utils");
const validate = require("../../utils/validate");

exports.list = async (req, res) => {
  try {
    const { isShow } = req.query;

    const data = await User.find({ isShow });

    const payload = {
      total: data.length,
      users: data
    };

    res.status(200).json(response(200, "Lấy danh sách người dùng thành công", payload));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.find = async (req, res) => {
  try {
    const { email } = req.params;

    const data = await User.findOne({ email });

    if (!data) return res.status(200).json(response(200, `Người dùng không tồn tại`, null));

    res.status(200).json(response(200, "Tìm kiếm người dùng thành công", { user: data }));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.insert = async (req, res) => {
  try {
    const { error, value } = validate.insertUser.validate(req.body);

    if (error) return res.status(400).json(response(400, error.message));

    if (req.files.length < 2) return res.status(400).json(response(400, "Cần chọn ít nhất 2 ảnh"));

    const images = [];
    for (let index = 0; index < req.files.length; index++) {
      images.push("public/data-image/" + req.files[index].filename)
    }

    let hobbies = [];
    hobbies = value.hobbies.slice(1, -1).split(',');

    let isShow = ["Mọi người", "", "", ""];

    const payload = {
      email: value.email,
      password: null,
      name: value.name,
      images,
      hobbies,
      birthDay: value.birthDay,
      gender: value.gender,
      description: "Không có gì để hiển thị",
      facilities: value.facilities,
      specialized: value.specialized,
      course: value.course,
      isShow,
      isActive: true,
      status: true,
      roleAdmin: false
    }

    await User.create(payload);
    res.status(201).json(response(201, "Tạo tài khoản thành công"))

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

// exports.delete = async (req, res) => {
//   try {
//     const { _id } = req.params;

//     const data = await User.findOne({ _id });

//     if (!data) return res.status(200).json(response(200, "Người dùng không tồn tại"));

//     await User.findByIdAndDelete({ _id: data._id });
//     res.status(200).json(response(200, "Xóa người dùng thành công"));

//   } catch (error) {
//     res.status(500).json(response(500, error.message));
//   }
// };
