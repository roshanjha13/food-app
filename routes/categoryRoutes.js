const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/create").post(createCategory);
router.route("/update-category").put(updateCategory);
router.route("/get-category").get(getCategory);
module.exports = router;
