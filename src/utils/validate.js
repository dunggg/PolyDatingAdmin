const joi = require("joi");

exports.listUser = joi.object({
    isShow: joi.array().required(),
    pageSize: joi.string().required(),
});

exports.insertUser = joi.object({
    email: joi.string().email().min(15).required(),
    name: joi.string().min(1).max(25).required(),
    hobbies: joi.string().required(),
    birthDay: joi.string().required(),
    gender: joi.string().required(),
    facilities: joi.string().required(),
    specialized: joi.string().required(),
    course: joi.string().required(),
    isShow: joi.string().required()
});

exports.insertReport = joi.object({
    emailReport: joi.string().email().required(),
    emailReported: joi.string().email().required(),
    title: joi.string().required(),
    content: joi.string().min(20).max(200).required()
});

exports.insertFavorite = joi.object({
    emailPersonal: joi.string().email().required(),
    emailLike: joi.string().email().required()
});