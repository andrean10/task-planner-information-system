const mongoose = require("mongoose");
let usersSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username harus di isi!"],
  },
  password: {
    type: String,
    require: [true, "Password harus di isi!"],
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", usersSchema);
