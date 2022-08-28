const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const decodeToken = (token) => {
  let decode;
  if (token) {
    decode = jwt.decode(token, process.env.JWT_SECRET);
  }
  return decode;
};

module.exports = { generateToken, decodeToken };
