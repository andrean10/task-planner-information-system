var express = require("express");
var router = express.Router();
const { viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require("../controller/TaskController");

// tasks
router.get("/create", viewCreate);
router.get("/:id", viewEdit);
router.post("/create", actionCreate);
router.put("/edit/:id", actionEdit)
router.delete("/delete/:id", actionDelete);

module.exports = router;
