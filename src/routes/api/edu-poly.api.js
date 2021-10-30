const express = require('express');
const router = express.Router();
const { response } = require('../../utils/utils');
const { course, hobbies, specialized, facilities } = require('../../controllers/api/edu-poly.api');

//Api
router.get('/hobbies', (req, res) => {
    res.status(200).json(response(200, "Get list hobbies successfully",
        { total: hobbies.length, hobbies: hobbies }))
});

router.get('/course', (req, res) => {
    res.status(200).json(response(200, "Get list course successfully",
        { total: course.length, course: course }))
});

router.get('/specialized', (req, res) => {
    res.status(200).json(response(200, "Get list specialized successfully",
        { total: specialized.length, specialized: specialized }))
});

router.get('/facilities', (req, res) => {
    res.status(200).json(response(200, "Get list facilities successfully",
        { total: facilities.length, facilities: facilities }))
});

module.exports = router;