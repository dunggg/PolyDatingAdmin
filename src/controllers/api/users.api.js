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

    let images = [];
    for (let index = 0; index < req.files.length; index++) {
      images.push(`public/data_images/${req.files[index].filename}`)
    }

    let hobbies = value.hobbies.slice(1, -1).split(',');

    let isShow = ["Mọi người", "Tất cả cơ sở", "Tất cả chuyên ngành", "Tất cả khóa học"];

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

exports.updateImages = async (req, res) => {
  try {
    const { _id, imageUrl, checkRemove } = req.body;

    const data = await User.findOne({ _id });

    let images = data.images;

    //Remove item images
    if (checkRemove == "1") {
      let index = images.indexOf(imageUrl);

      if (index != -1) {
        images.splice(index, 1)
      }
    }
    //Add images
    else if (req.files.length > 0) {
      images.push(`public/data_images/${req.files[0].filename}`);
    }

    await User.updateOne({ _id: data._id }, { images })
    res.status(200).json(response(200, "Cập nhật ảnh thành công", images));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateIsShow = async (req, res) => {
  try {
    const { _id, isShow } = req.body;

    const data = await User.findOne({ _id });

    let shows = isShow.slice(1, -1).split(',');

    const payload = {
      isShow: shows
    }

    await User.updateOne({ _id: data._id }, payload)
    res.status(200).json(response(200, "Cập nhật hiển thị thành công"));

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
