const express = require("express");
const router = express.Router();
const favorite = require("../../controllers/api/favorites.api");

//Api
router.get("/list/:emailBeLiked", favorite.list);
router.post("/insert", favorite.insert);
router.post("/update", favorite.update);
router.post("/delete", favorite.delete);

module.exports = router;