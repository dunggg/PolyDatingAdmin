const User = require("../../models/user.schema");
const Favorite = require('../../models/favorite.schema');
const { response, insertUser, updateUser, checkPassword } = require("../../utils/utils");
const info = require('../../config/info');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

let pathUrl = "https://poly-dating.herokuapp.com/public/data_images/";

exports.list = async (req, res) => {
  try {
    const { isShow, hobbies, statusHobby, emailBeLiked } = req.query;

    let shows = isShow.slice(1, -1).split(', ');
    let hobby = hobbies.slice(1, -1).split(', ');
    let emailBK = emailBeLiked.slice(1, -1).split(', ');

    let data;

    // Nếu tìm kiếm sở thích giống mình
    if (statusHobby === "true") {
      const option = {
        isShow: shows,
        hobbies: { $all: hobby }
      }

      data = await User.find(option);
    }
    // Không tìm cùng
    else {
      data = await User.find({ isShow: shows });
    }

    // Nếu user A đã thích user B thì trả về list của user A sẽ không có user B
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < emailBK.length; j++) {

        if (data[i].email === emailBK[j]) {
          data.splice(i, emailBK.length);
          break;
        }
      }
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
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json(response(404, `Người dùng không tồn tại`, null));
    }
    else if (user.isActive == false) {
      res.status(400).json(response(400, `Tài khoản của bạn đã bị khóa`, user));
    }
    else {
      res.status(200).json(response(200, "Đăng nhập thành công", user));
    }

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
}

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

    let passRandom = randomString.generate(10);
    let hassPass = jwt.sign(passRandom, info.hassPassKey);

    const payload = {
      email: value.email,
      password: hassPass,
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
      statusHobby: false,
      roleAdmin: false,
      createdAt: req.getTime,
      updatedAt: req.getTime
    }

    await User.create(payload);

    const decode = {
      email: payload.email,
      passRandom
    }

    req.decoded = decode;
    next();
    // send email

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateImages = async (req, res) => {
  try {
    const { _id, imageUrl, checkRemove } = req.body;

    const data = await User.findOne({ _id });

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

    await User.updateOne({ _id: data._id }, payload)
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

    await User.findOneAndUpdate({ _id: value._id }, payload);
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

    await User.findOneAndUpdate({ _id }, payload);
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

    await User.findOneAndUpdate({ _id }, payload);
    res.status(200).json(response(200, "Cập nhật tìm kiếm sở thích thành công"));

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { error, value } = checkPassword.validate(req.body);

    if (error) return res.status(400).json(response(400, error.message));

    const data = await User.findOne({ _id: value._id });
    const verifyPass = jwt.verify(data.password, info.hassPassKey);

    if (value.passOld !== verifyPass) {
      res.status(400).json(response(400, "Sai mật khẩu cũ"));
    }
    else if (value.passNew !== value.passConfirm) {
      res.status(400).json(response(400, "Vui lòng nhập đúng mật khẩu"));
    }
    else {
      const password = jwt.sign(value.passNew, info.hassPassKey);

      const payload = {
        password,
        updatedAt: req.getTime
      }

      await User.updateOne({ _id: data._id }, payload);
      res.status(200).json(response(200, "Thay đổi mật khẩu thành công"));
    }

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const data = await User.findOne({ email });

    if (!data) return res.status(404).json(response(404, "Email không tồn tại"));

    let passRandom = randomString.generate(10);
    let hassPass = jwt.sign(passRandom, info.hassPassKey);

    const payload = {
      password: hassPass,
      updatedAt: req.getTime
    }

    await User.updateOne({ _id: data._id }, payload);

    const decode = {
      email,
      passRandom
    }

    req.decoded = decode;
    next()
    // send email

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.delete = async (req, res) => {
  try {
    const { _id, password } = req.body;

    const data = await User.findOne({ _id });
    const verifyPass = jwt.verify(data.password, info.hassPassKey);

    if (!password) {
      res.status(400).json(response(400, "Vui lòng nhập mật khẩu"));
    }
    else if (password != verifyPass) {
      res.status(400).json(response(400, "Sai mật khẩu"));
    }
    else {
      await Favorite.deleteMany({ 'userBeLiked.email': data.email })
      await Favorite.deleteMany({ 'userLiked.email': data.email })
      await User.deleteOne({ _id: data._id });

      res.status(200).json(response(200, "Xóa tài khoản thành công"));
    }

  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};
