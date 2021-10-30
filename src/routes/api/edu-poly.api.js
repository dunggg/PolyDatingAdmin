const express = require('express');
const router = express.Router();
const { response } = require('../../utils/utils');
const { course, hobbies, specialized, facilities, reports } = require('../../controllers/api/edu-poly.api');

//Api
router.get('/hobbies', (req, res) => {
    res.status(200).json(response(200, "Get list hobbies successfully",
        { total: hobbies.length, hobbies }))
});

router.get('/course', (req, res) => {
    res.status(200).json(response(200, "Get list course successfully",
        { total: course.length, course }))
});

router.get('/specialized', (req, res) => {
    res.status(200).json(response(200, "Get list specialized successfully",
        { total: specialized.length, specialized }))
});

router.get('/facilities', (req, res) => {
    res.status(200).json(response(200, "Get list facilities successfully",
        { total: facilities.length, facilities }))
});

router.get('/reports', (req, res) => {
    res.status(200).json(response(200, "Get list reports successfully",
        { total: reports.length, reports }))
});

module.exports = router;