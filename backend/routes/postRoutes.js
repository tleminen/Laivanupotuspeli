const express = require("express");
const postControllers = require("../controllers/postControllers");
const router = express.Router();

router.route("/").post(postControllers.createNewPosts); //lisaa

router.route("/").get(postControllers.getAllPosts); //hae kaikki

module.exports = router;
