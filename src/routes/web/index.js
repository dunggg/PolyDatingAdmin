const express = require('express');
const router = express.Router();

//Web
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/statistical', (req, res) => {
    res.render('statistical');
});

router.get('/reports', (req, res) => {
    res.render('reports');
});

router.get('/notifications', (req, res) => {
    res.render('notifications');
});

module.exports = router;