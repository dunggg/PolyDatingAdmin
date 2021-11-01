const joi = require("joi");

exports.insertUser = joi.object({
    email: joi.string().email().min(1).required(),
    name: joi.string().min(5).max(20).required(),
    hobbies: joi.any(),
    birthDay: joi.string().required(),
    gender: joi.string().required(),
    facilities: joi.string().required(),
    specialized: joi.string().required(),
    course: joi.string().required(),
    isShow: joi.any()
});

exports.listUser = joi.object({
    isShow: joi.array().required(),
    pageSize: joi.string().required(),
});

exports.insertReport = joi.object({
    emailReport: joi.string().email().required(),
    emailReported: joi.string().email().required(),
    title: joi.string().required(),
    content: joi.string().min(20).max(200).required()
});

exports.listFavorite = joi.object({
    emailPersonal: joi.string().email().required()
});

exports.insertFavorite = joi.object({
    emailPersonal: joi.string().email().required(),
    emailLike: joi.string().email().required()
});