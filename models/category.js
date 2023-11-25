const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    topic: {
      type: String,
    },
    category: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", categorySchema);
