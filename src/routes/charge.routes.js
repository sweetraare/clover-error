const express = require("express");
const router = express.Router();

const cloverController = require("../controllers/clover.controller");

router.post("/", cloverController.charge);

module.exports = router;
