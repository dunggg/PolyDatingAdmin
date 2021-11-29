const express = require('express');
const router = express.Router();

router.get('/export-xlsx', (req, res, next) => {
  res.render('download_xlsx');
});

module.exports = router;
