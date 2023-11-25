const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, index: true },
    password: String,
    mobile: String,
    DOB: String,
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d",
    }
  );
};

// Match Password
userSchema.method("comparePassword", async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
});

module.exports = mongoose.model("users", userSchema);
