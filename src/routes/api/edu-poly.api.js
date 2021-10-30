const express = require('express');
const router = express.Router();
const { response } = require('../../utils/utils');
const { course, hobbies, specialized, facilities, reports } = require('../../controllers/api/edu-poly.api');

//Api
router.get('/hobbies', (req, res) => {
    try {
        res.status(200).json(response(200, "Get list hobbies successfully",
            { total: hobbies.length, hobbies }));
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
});

router.get('/course', (req, res) => {
    try {
        res.status(200).json(response(200, "Get list course successfully",
            { total: course.length, course }));
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
});

router.get('/specialized', (req, res) => {
    try {
        res.status(200).json(response(200, "Get list specialized successfully",
            { total: specialized.length, specialized }));
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
});

router.get('/facilities', (req, res) => {
    try {
        res.status(200).json(response(200, "Get list facilities successfully",
            { total: facilities.length, facilities }));
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
});

router.get('/reports', (req, res) => {
    try {
        res.status(200).json(response(200, "Get list reports successfully",
            { total: reports.length, reports }));
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
});

module.exports = router;