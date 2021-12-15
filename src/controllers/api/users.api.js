let Users = require('../../models/users.schema');
let Friends = require('../../models/friends.schema');
let Reports = require('../../models/reports.schema');
let Notifications = require('../../models/notifications.schema');
let { response, insertUser, updateUser } = require('../../utils/utils');
let info = require('../../config/info');
let randomString = require('randomstring');
let jwt = require('jsonwebtoken');
let moment = require('moment');

let pathUrl = 'https://poly-dating.herokuapp.com/public/data_images/';

exports.list = async (req, res) => {
  try {
    let { isShow, hobbies, statusHobby } = req.query;

    let shows = isShow.slice(1, -1).split(', ');
    let hobby = hobbies.slice(1, -1).split(', ');
    let data;

    let search = {
      role: 'Người dùng',
    };

    if (shows[0] != 'Mọi người') {
      search = {
        ...search,
        gender: shows[0],
      };
    }
    if (shows[1] != 'Tất cả cơ sở') {
      search = {
        ...search,
        facilities: shows[1],
      };
    }
    if (shows[2] != 'Tất cả chuyên ngành') {
      search = {
        ...search,
        specialized: shows[2],
      };
    }
    if (shows[3] != 'Tất cả khóa học') {
      search = {
        ...search,
        course: shows[3],
      };
    }

    // Nếu tìm kiếm sở thích giống mình
    if (statusHobby === 'true') {
      search = {
        ...search,
        hobbies: { $all: hobby },
      };
      data = await Users.find(search);
    } else {
      data = await Users.find(search);
    }

    let payload = {
      total: data.length,
      users: data,
    };

    res
      .status(200)
      .json(response(200, 'Lấy danh sách người dùng thành công', payload));
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.signIn = async (req, res) => {
  try {
    let { email, token } = req.body;
    let user = await Users.findOne({ email });

    if (!user) {
      res.status(404).json(response(404, `Tài khoản không tồn tại`, null));
    } else if (user.isActive == 'Khóa') {
      res.status(403).json(response(403, `Tài khoản của bạn đã bị khóa`, user));
    } else {
      let optionToken = {
        notificationToken: token || null,
        updatedAt: req.getTime,
      };

      await Users.updateOne({ _id: user._id }, optionToken);
      res.status(200).json(response(200, 'Đăng nhập thành công', user));
    }
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.signOut = async (req, res) => {
  try {
    let optionToken = {
      notificationToken: null,
      updatedAt: req.getTime,
    };

    await Users.updateOne({ _id: req.currentUser._id }, optionToken);
    res.status(200).json(response(200, 'Đăng xuất thành công'));
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.signUp = async (req, res) => {
  try {
    let { error, value } = insertUser.validate(req.body);

    if (error) {
      res.status(400).json(response(400, error.message));
    } else if (req.files.length < 2) {
      res.status(400).json(response(400, 'Cần chọn ít nhất 2 ảnh'));
    } else {
      let images = [];
      for (let index = 0; index < req.files.length; index++) {
        images.push(pathUrl + req.files[index].filename);
      }

      let hobbies = value.hobbies.slice(1, -1).split(', ');
      let isShow = [
        'Mọi người',
        'Tất cả cơ sở',
        'Tất cả chuyên ngành',
        'Tất cả khóa học',
      ];
      let accessToken = jwt.sign(value.email, info.accessKey);

      let arr = value.birthDay.split('/');
      let birthDay = `${arr[2]}-${arr[1]}-${arr[0]}`;

      console.log(birthDay);
      let payload = {
        email: value.email,
        password: null,
        name: value.name,
        images,
        hobbies,
        gender: value.gender,
        birthDay,
        phone: '',
        description: 'Không có gì để hiển thị',
        facilities: value.facilities,
        specialized: value.specialized,
        course: value.course,
        isShow,
        isActive: 'Kích hoạt',
        role: 'Người dùng',
        statusHobby: false,
        reportNumber: 0,
        code: null,
        accessToken,
        notificationToken: value.token,
        createdAt: req.getTime,
        updatedAt: req.getTime,
      };

      await Users.create(payload);
      res.status(200).json(response(200, 'Tạo tài khoản thành công'));
    }
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateImages = async (req, res) => {
  try {
    let { imageUrl, checkRemove } = req.body;

    let currentUser = req.currentUser;
    let images = currentUser.images;

    // Xóa ảnh
    if (checkRemove == 'true') {
      if (images.length <= 2) {
        res.status(400).json(response(400, 'Không thể xóa khi còn 2 ảnh'));
      } else {
        let index = images.indexOf(imageUrl);

        if (index != -1) {
          images.splice(index, 1);
        }
      }
    }
    // Thêm ảnh
    else if (req.files.length > 0) {
      images.push(pathUrl + req.files[0].filename);
    }

    let payload = {
      images,
      updatedAt: req.getTime,
    };

    let newUser = await Users.findOneAndUpdate(
      { _id: currentUser._id },
      payload,
    );

    let optionUpdate = {
      email: newUser.email,
      name: newUser.name,
      images: newUser.images,
      hobbies: newUser.hobbies,
      gender: newUser.gender,
      birthDay: newUser.birthDay,
      description: newUser.description,
      facilities: newUser.facilities,
      specialized: newUser.specialized,
      course: newUser.course,
    };

    await Friends.updateMany({ 'myUser.email': newUser.email }, optionUpdate);
    await Friends.updateMany({ 'friend.email': newUser.email }, optionUpdate);

    res.status(200).json(response(200, 'Cập nhật ảnh thành công', images));
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateInformation = async (req, res) => {
  try {
    let { error, value } = updateUser.validate(req.body);

    if (error) return res.status(400).json(response(400, error.message));

    let currentUser = req.currentUser;
    let hobbies = value.hobbies.slice(1, -1).split(', ');

    let payload = {
      hobbies,
      description: value.description,
      facilities: value.facilities,
      specialized: value.specialized,
      updatedAt: req.getTime,
    };

    let newUser = await Users.findOneAndUpdate(
      { _id: currentUser._id },
      payload,
    );

    let optionUpdate = {
      email: newUser.email,
      name: newUser.name,
      images: newUser.images,
      hobbies: newUser.hobbies,
      gender: newUser.gender,
      birthDay: newUser.birthDay,
      description: newUser.description,
      facilities: newUser.facilities,
      specialized: newUser.specialized,
      course: newUser.course,
    };

    await Friends.updateMany({ 'myUser.email': newUser.email }, optionUpdate);
    await Friends.updateMany({ 'friend.email': newUser.email }, optionUpdate);

    res.status(200).json(response(200, 'Cập nhật thông tin thành công'));
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateIsShow = async (req, res) => {
  try {
    let { isShow } = req.body;

    let currentUser = req.currentUser;
    let shows = isShow.slice(1, -1).split(', ');

    let payload = {
      isShow: shows,
      updatedAt: req.getTime,
    };

    await Users.updateOne({ _id: currentUser._id }, payload);
    res.status(200).json(response(200, 'Cập nhật hiển thị thành công'));
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.updateStatusHobby = async (req, res) => {
  try {
    let { statusHobby } = req.body;
    let currentUser = req.currentUser;

    let payload = {
      statusHobby,
      updatedAt: req.getTime,
    };

    await Users.updateOne({ _id: currentUser._id }, payload);
    res
      .status(200)
      .json(response(200, 'Cập nhật tìm kiếm theo sở thích thành công'));
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.requestCode = async (req, res, next) => {
  try {
    let codeRandom = randomString.generate(6);
    let currentUser = req.currentUser;

    let payload = {
      code: codeRandom,
      updatedAt: req.getTime,
    };
    await Users.updateOne({ _id: currentUser._id }, payload);

    // Nếu sau 5 phút (300000 ms) code không được nhập thì xóa code
    setTimeout(async () => {
      let time = new Date();

      let payload2 = {
        code: null,
        updatedAt: time,
      };
      await Users.updateOne({ _id: currentUser._id }, payload2);
    }, 300000);

    req.decoded = {
      email: currentUser.email,
      codeRandom,
    };
    next();
    // send email
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};

exports.delete = async (req, res) => {
  try {
    let { code } = req.body;
    let currentUser = req.currentUser;

    if (!code) {
      res.status(400).json(response(400, 'Vui lòng nhập mã xác nhận'));
    } else if (code != currentUser.code) {
      res.status(400).json(response(400, 'Sai mã xác nhận'));
    } else {
      await Friends.deleteMany({ 'myUser.email': currentUser.email });
      await Friends.deleteMany({ 'friends.email': currentUser.email });
      await Notifications.deleteMany({ emailSender: currentUser.email });
      await Notifications.deleteMany({ emailReceiver: currentUser.email });
      await Reports.deleteMany({ emailSender: currentUser.email });
      await Reports.deleteMany({ emailReceiver: currentUser.email });
      await Users.deleteOne({ _id: currentUser._id });

      res.status(200).json(response(200, 'Xóa tài khoản thành công'));
    }
  } catch (error) {
    res.status(500).json(response(500, error.message));
  }
};
