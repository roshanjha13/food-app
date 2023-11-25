const express = require("express");
const {
  createCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/create").post(createCategory);
router.route("/update-category").put(updateCategory);
module.exports = router;
