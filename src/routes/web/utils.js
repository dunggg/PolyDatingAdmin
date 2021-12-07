const express = require('express');
const router = express.Router();
const exportExecl = require('../../utils/exportExcel');

router.get('/export-xlsx', (req, res, next) => {
  const fileName = exportExecl();
  res.render('download_xlsx', { fileName });
});

module.exports = router;
