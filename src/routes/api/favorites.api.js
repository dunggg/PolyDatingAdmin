const express = require("express");
const router = express.Router();
const favorite = require("../../controllers/api/favorites.api");

//Api
router.get("/list/be_liked/:emailBeLiked", favorite.listBeLiked);
router.get("/list/liked/:emailLiked", favorite.listLiked);
router.post("/insert", favorite.insert);
router.post("/update", favorite.update);
router.post("/delete", favorite.delete);

module.exports = router;