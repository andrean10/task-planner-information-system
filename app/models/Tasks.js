const mongoose = require("mongoose");
let tasksSchema = mongoose.Schema({
  note: {
    type: String,
    require: [true, "Catatan harus di isi!"],
  },
  start_time: {
    type: Date,
    require: [true, "Tanggal harus diisi"],
  },
  end_time: {
    type: Date,
    require: [true, "Batas waktu harus diisi"],
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards",
    require: [true, "Id board harus ada!"],
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: [true, "Id user harus ada!"],
  },
  started_by: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: [true, "Id user harus ada!"],
  }],
  finished_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: [true, "Id user harus ada!"],
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tasks", tasksSchema);
