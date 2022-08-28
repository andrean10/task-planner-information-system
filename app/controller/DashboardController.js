const { decodeToken } = require("../../utils/generateToken");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

const index = async (req, res) => {
  try {
    let sessionUsers = JSON.parse(localStorage.getItem("users"));
    let token = decodeToken(sessionUsers.token);

    return res.render("index");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
};
