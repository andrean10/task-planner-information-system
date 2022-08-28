const Auth = require("../models/Auth");
const generateToken = require("../../utils/generateToken");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    console.log("alert = ", alert);

    res.render("auth/view_login", { alert });
  } catch (err) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/auth/login");
  }
};

const checkLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const check = await Auth.findOne({ username: username, password });
    if (check) {
      if (check.is_active) {
        if (check.password == password) {
          let token = generateToken.generateToken(check._id);
          const setSession = {
            id: check._id,
            token: token,
          };
          localStorage.setItem("users", JSON.stringify(setSession));
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", "Akun anda belum diaktifkan");
        req.flash("alertStatus", "danger");
        res.redirect("/auth/login");
      }
    } else {
      req.flash("alertMessage", "Username salah");
      req.flash("alertStatus", "danger");
      res.redirect("/auth/login");
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/auth/login");
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    localStorage.clear();
    res.redirect("/auth/login");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/auth/login");
  }
};

module.exports = {
  index,
  checkLogin,
  logout,
};
