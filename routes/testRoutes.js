const { testUserCotrollers } = require("../controllers/test-controller");

const express = require("express");

const router = express.Router();
router.get("/test-user", testUserCotrollers);

module.exports = router;
