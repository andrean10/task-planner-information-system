const Board = require("../models/Board");
const Tasks = require("../models/Tasks");
const { decodeToken } = require("../../utils/generateToken");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

let token;

const index = async (req, res) => {
  try {
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    let sessionUsers = JSON.parse(localStorage.getItem("users"));
    token = decodeToken(sessionUsers.token);
    let usersId = token.id;

    const boards = await Board.find({ created_by: usersId });

    res.render("board/view_board", {
      boards,
      alert,
    });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board");
    console.log(error);
  }
};

const viewCreate = async (req, res) => {
  try {
    res.render("board/create");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board");
  }
};

const actionCreate = async (req, res) => {
  try {
    const { note } = req.body;

    const board = await Board({
      note: note,
      created_by: token.id,
      is_active: true,
    });

    await board.save();

    req.flash("alertMessage", "Berhasil tambah board");
    req.flash("alertStatus", "success");

    res.redirect("/board");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board");
    console.log(error);
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findOne({ _id: id });
    res.render("board/edit", { board });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board");
  }
};

const viewCard = async (req, res) => {
  try {
    const { id } = req.params;
    let tasks = await Tasks.findById(id);
    return res.send({ data: tasks });
  } catch (error) {
    return res.send(error);
  }
};

const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    await Board.findOneAndUpdate({ _id: id }, { note: note });

    req.flash("alertMessage", "Berhasil ubah board");
    req.flash("alertStatus", "success");

    res.redirect("/board");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board");
  }
};

const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('id board = ', id);

    await Board.findOneAndRemove({ _id: id });

    req.flash("alertMessage", "Berhasil hapus board");
    req.flash("alertStatus", "success");

    res.redirect("/board");
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board");
  }
};

const viewDetailBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const board = await Board.findOne({ _id: id });
    const tasks = await Tasks.find({ board: id });

    console.log('Tasks = ', tasks);

    res.render("board/view_detail_board", { board, tasks });
  } catch (error) {
    console.log(error);
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board");
  }
};

module.exports = {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  viewCard,
  actionEdit,
  actionDelete,
  viewDetailBoard,
};
