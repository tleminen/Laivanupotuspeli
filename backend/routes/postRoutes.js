const express = require("express");
const postControllers = require("../controllers/postControllers");
const router = express.Router();

router.route("/").post(postControllers.createNewPost); //lisaa

router.route("/").get(postControllers.getAllPosts); //hae kaikki

router.route("/muokkaa/:id").put(postControllers.putPosts); //muokkaa IDn perusteella

module.exports = router;
