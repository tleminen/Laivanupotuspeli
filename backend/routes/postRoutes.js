const express = require("express");
const postControllers = require("../controllers/postControllers");
const router = express.Router();

router.route("/").post(postControllers.createPosts); //lisaa

router.route("/").get(postControllers.getPosts); //hae kaikki

module.exports = router;
