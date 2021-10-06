var express = require('express');
var router = express.Router();
const { hobbies, facilities, specialized, course } = require('../../constants')

router.get('/hobbies', (req, res) => res.json(hobbies));
router.get('/facilities', (req, res) => res.json(facilities));
router.get('/specialized', (req, res) => res.json(specialized));
router.get('/course', (req, res) => res.json(course));

module.exports = router;
