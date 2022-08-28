const jwt = require("jsonwebtoken");
const config = require("config");
const dotenv = require("dotenv");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  console.log(req);

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denies" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
