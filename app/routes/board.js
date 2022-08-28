var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  viewCard,
  actionEdit,
  actionDelete,
  viewDetailBoard,
} = require("../controller/BoardController");

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.get("/card/:id", viewCard);
router.put("/edit/:id", actionEdit);
router.delete("/delete/:id", actionDelete);
router.get("/:id", viewDetailBoard);

module.exports = router;
