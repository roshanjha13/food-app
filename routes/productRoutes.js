const express = require("express");
const {
  getAllProducts,
  createProducts,
  getSingleProduct,
  getAllProductsByCategory,
} = require("../controllers/productController");
// const { isAuth, isAdmin } = require("../middleware/authMiddlware");
// const { singleUpload } = require("../middleware/multer");

const router = express.Router();

router.route("/get-all").get(getAllProducts);
router.route("/getAllProductsByCategory").get(getAllProductsByCategory);
router.route("/:id").get(getSingleProduct);

router.route("/create").post(createProducts);

module.exports = router;
