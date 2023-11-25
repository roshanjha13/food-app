const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  // const { token } = req.cookies;
  const token =
    req.body.accessToken ||
    req.query.accessToken ||
    req.headers["authorization"];

  if (!token) {
    res.status(401);
    throw new Error("Not Logged In");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.admin = await userModel.findById(decoded._id);

  next();
});

module.exports = isAuthenticated;
