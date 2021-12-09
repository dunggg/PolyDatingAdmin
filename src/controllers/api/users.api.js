const Users = require("../../models/users.schema");
const Friends = require('../../models/friends.schema');
const Tokens = require('../../models/tokens.schema');
const { response, insertUser, updateUser } = require("../../utils/utils");
const randomString = require('randomstring');

let pathUrl = "https://poly-dating.herokuapp.com/public/data_images/";

exports.list = async (req, res) => {
  try {
    const { isShow, hobbies, statusHobby } = req.query;

    let shows = isShow.slice(1, -1).split(', ');
    let hobby = hobbies.slice(1, -1).split(', ');
    let data;

    // Nếu tìm kiếm sở thích giống mình
    if (statusHobby === "true") {
      const option = {
        isShow: shows,
        hobbies: { $all: hobby }
      }

      data = await Users.find(option);
    }
    // Không tìm cùng
    else {
      data = await Users.find({ isShow: shows });
    }

    const payload = {
      total: data.length,
      users: data
    }

    res.status(200).json(response(200, "Lấy danh sách người dùng thành công", payload));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, token } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      res.status(404).json(response(404, `Người dùng không tồn tại`, null));
    }

    else if (user.isActive == false) {
      res.status(400).json(response(400, `Tài khoản của bạn đã bị khóa`, user));
    }

    else {
      const dataToken = await Tokens.findOne({ email });

      if (!dataToken) {
        const optionToken = {
          email,
          token,
          createdAt: req.getTime,
        }

        await Tokens.create(optionToken);
      }

      res.status(200).json(response(200, "Đăng nhập thành công", user));
    }

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.signOut = async (req, res) => {
  try {
    const { email } = req.body;

    await Tokens.deleteOne({ email });
    res.status(200).json(response(200, "Đăng xuất thành công"));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { error, value } = insertUser.validate(req.body);

    if (error) return res.status(400).json(response(400, error.message));

    if (req.files.length < 2) return res.status(400).json(response(400, "Cần chọn ít nhất 2 ảnh"));

    let images = [];
    for (let index = 0; index < req.files.length; index++) {
      images.push(pathUrl + req.files[index].filename);
    }

    let hobbies = value.hobbies.slice(1, -1).split(', ');

    let isShow = ["Mọi người", "Tất cả cơ sở", "Tất cả chuyên ngành", "Tất cả khóa học"];

    const payload = {
      email: value.email,
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
      statusHobby: false,
      reportNumber: 0,
      code: null,
      createdAt: req.getTime,
      updatedAt: req.getTime
    }

    await Users.create(payload); // Create User

    const optionToken = {
      email: value.email,
      token: value.token,
      createdAt: req.getTime,
    }

    await Tokens.create(optionToken); // Create Token

    res.status(200).json(response(200, "Tạo tài khoản thành công"))

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateImages = async (req, res) => {
  try {
    const { _id, imageUrl, checkRemove } = req.body;

    const data = await Users.findOne({ _id });

    let images = data.images;

    // Xóa ảnh
    if (checkRemove === "true") {
      if (images.length <= 2) return res.status(400).json(response(400, "Không thể xóa khi còn 2 ảnh"));

      let index = images.indexOf(imageUrl);

      if (index != -1) {
        images.splice(index, 1)
      }
    }
    // Thêm ảnh
    else if (req.files.length > 0) {
      images.push(pathUrl + req.files[0].filename);
    }

    const payload = {
      images,
      updatedAt: req.getTime
    }

    await Users.updateOne({ _id: data._id }, payload)
    res.status(200).json(response(200, "Cập nhật ảnh thành công", images));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateInformation = async (req, res) => {
  try {
    const { error, value } = updateUser.validate(req.body);

    if (error) return res.status(400).json(response(400, error.message));

    let hobbies = value.hobbies.slice(1, -1).split(', ');

    const payload = {
      description: value.description,
      hobbies,
      facilities: value.facilities,
      specialized: value.specialized,
      updatedAt: req.getTime
    }

    await Users.findOneAndUpdate({ _id: value._id }, payload);
    res.status(200).json(response(200, "Cập nhật thông tin thành công"));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateIsShow = async (req, res) => {
  try {
    const { _id, isShow } = req.body;

    let shows = isShow.slice(1, -1).split(', ');

    const payload = {
      isShow: shows,
      updatedAt: req.getTime
    }

    await Users.findOneAndUpdate({ _id }, payload);
    res.status(200).json(response(200, "Cập nhật hiển thị thành công"));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateStatusHobby = async (req, res) => {
  try {
    const { _id, statusHobby } = req.body;

    const payload = {
      statusHobby,
      updatedAt: req.getTime
    }

    await Users.findOneAndUpdate({ _id }, payload);
    res.status(200).json(response(200, "Cập nhật tìm kiếm sở thích thành công"));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.requestCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const data = await Users.findOne({ email });

    if (!data) return res.status(404).json(response(404, "Email không tồn tại"));

    let codeRandom = randomString.generate(6);

    const payload = {
      code: codeRandom,
      updatedAt: req.getTime
    }

    await Users.updateOne({ _id: data._id }, payload);

    // Nếu sau 5 phút (300000 ms) code không được nhập thì xóa code
    setTimeout(async () => {
      let time = new Date().toLocaleString("VN", { timeZone: "Asia/Ho_Chi_Minh" });

      const payload2 = {
        code: null,
        updatedAt: time
      }

      await Users.updateOne({ _id: data._id }, payload2);
    }, 300000);

    req.decoded = {
      email,
      codeRandom
    };
    next()
    // send email

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.delete = async (req, res) => {
  try {
    const { _id, code } = req.body;

    const data = await Users.findOne({ _id });

    if (!code) {
      res.status(400).json(response(400, "Vui lòng nhập mã xác nhận"));
    }
    else if (code != data.code) {
      res.status(400).json(response(400, "Sai mã xác nhận"));
    }
    else {
      await Friends.deleteMany({ 'myUser.email': data.email });
      await Friends.deleteMany({ 'friends.email': data.email });
      await Users.deleteOne({ _id: data._id });

      res.status(200).json(response(200, "Xóa tài khoản thành công"));
    }

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};
