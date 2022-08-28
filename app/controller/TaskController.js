const mongoose = require("mongoose");
const Tasks = require("../models/Tasks");
const Users = require("../models/Auth");
const { decodeToken } = require("../../utils/generateToken");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

let token;

const viewCreate = async (req, res) => {
  try {
    const { idBoard } = req.query;

    let sessionUsers = JSON.parse(localStorage.getItem("users"));
    token = decodeToken(sessionUsers.token);
    let idUser = token.id;

    const users = await Users.find();
    console.log("users = ", idUser);

    res.render("task/create", { idBoard, idUser, users });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board/");
  }
};

const actionCreate = async (req, res) => {
  try {
    const { idBoard } = req.query;
    const { note, start_time, end_time, asigns_to } = req.body;

    const tasks = Tasks({
      note: note,
      start_time: start_time,
      end_time: end_time,
      board: idBoard,
      created_by: token.id,
      started_by: asigns_to,
      is_active: true,
    });

    await tasks.save();

    res.redirect(`/board/${idBoard}`);
  } catch (error) {
    console.log(error);
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { idBoard } = req.query;

    let sessionUsers = JSON.parse(localStorage.getItem("users"));
    token = decodeToken(sessionUsers.token);
    let idUser = token.id;

    // get detail task
    const task = await Tasks.findOne({ _id: id });

    // get users
    const users = await Users.find();

    res.render("task/edit", { idBoard, idUser, users, task });
  } catch (error) {
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/board/");
  }
};

const actionEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { note, start_time, end_time, asigns_to } = req.body;

    const task = await Tasks.findOne({ _id: id });

    const newTask = Tasks({
      note: note,
      start_time: start_time,
      end_time: end_time,
      board: task.board,
      created_by: token.id,
      started_by: asigns_to,
      is_active: true,
    });

    await Tasks.findOneAndUpdate({ _id: id }, newTask);

    res.redirect(`/board/${task.board}`);
  } catch (error) {
    console.log(error);
  }
};

const actionDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Tasks.findOne({ _id: id });
    await task.remove();

    res.redirect(`/board/${task.board}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
};
