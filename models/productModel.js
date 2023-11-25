const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: String,
    heading: String,
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: {
      type: String,
    },
    price: Number,
    category: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("products", productSchema);
