const path = require("path");
const ejs = require("ejs");
const transporter = require("./transporter");

exports.sendUserRegisterEmail = async ({ name, email, otpNumber }) => {
  const templatePath = path.join(__dirname, "../views/SignupOtp.ejs");

  const data = await ejs.renderFile(templatePath, {
    name,
    otpNumber,
  });

  const mainOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "OTP RECEIVED",
    html: data,
  };
  await transporter.sendMail(mainOptions);
};
