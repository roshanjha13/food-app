const { sendUserRegisterEmail } = require("../mail/sendMail");
const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const { sendToken } = require("../utils/sendToken");
const otpGenerator = require("otp-generator");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(401).json({ message: "Please enter all fields" });

  const userExist = await userModel.findOne({ email });

  if (userExist)
    return res.status(401).json({ message: "User Already Exists" });

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const otpNumber = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const query = { userId: user._id };
  const update = {
    $set: { email, userId: user._id, createdAt: Date.now() },
    $setOnInsert: {
      otp: otpNumber,
    },
  };
  const options = { upsert: true };

  await otpModel.updateOne(query, update, options);

  const userOtp = await otpModel.findOne({ email });
  sendUserRegisterEmail({
    name: user.name,
    email,
    otpNumber: userOtp.otp,
  });

  sendToken(res, user, "Registered Successfully", 201);
};
