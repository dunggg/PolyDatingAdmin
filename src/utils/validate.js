const joi = require("joi");

exports.insertUser = joi.object({
    email: joi.string().email().min(1).required(),
    name: joi.string().min(5).max(20).required(),
    hobbies: joi.array().max(5).required(),
    birthDay: joi.string().required(),
    gender: joi.string().required(),
    facilities: joi.string().required(),
    specialized: joi.string().required(),
    course: joi.string().required(),
    isShow: joi.array().required(),
});

exports.listUser = joi.object({
    isShow: joi.array().required(),
    pageSize: joi.string().required(),
});
