const express = require("express");
const router = express.Router();
const favorite = require("../../controllers/api/favorites.api");

//Api
router.get("/list/:emailPersonal", favorite.list);
router.post("/insert", favorite.insert);
router.post("/delete", favorite.delete);

module.exports = router;