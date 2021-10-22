const joi = require("joi");

exports.insertUser = joi.object({
    email: joi.string().email().required(),
    name: joi.string().min(5).max(20).required(),
    hobbies: joi.any().required(),
    birthDay: joi.string().required(),
    gender: joi.string().required(),
    facilities: joi.string().required(),
    specialized: joi.string().required(),
    course: joi.string().required()
});

exports.listUser = joi.object({
    isShow: joi.string().required(),
    pageSize: joi.string().required()
})