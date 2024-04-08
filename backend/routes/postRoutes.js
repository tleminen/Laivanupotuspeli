const express = require("express");
const postControllers = require("../controllers/postControllers");
const router = express.Router();

router.route("/").post(postControllers.createNewPost); //rekisteröityminen

router.route("/").get(postControllers.getAllPosts); //hae kaikki

router.route("/:id").put(postControllers.putPosts); //muokkaa IDn perusteella

router.route("/").post(postControllers.kirjautuminen); //Kirjautuminen

module.exports = router;
