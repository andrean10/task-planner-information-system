const mongoose = require("mongoose");
const { urlDb } = require("./index");

mongoose.connect(urlDb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;
