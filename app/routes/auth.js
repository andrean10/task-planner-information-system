var express = require("express");
var router = express.Router();
const { index, checkLogin, logout } = require("../controller/AuthController");

router.get("/login", index);
router.post("/login", checkLogin);
router.get("/logout", logout);

module.exports = router;
