const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
    email: {
      type: String,
    },
    otp: {
      type: String,
    },
    createdAt: {
      type: Date,
      expires: 60 * 2,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("otp", otpSchema);
