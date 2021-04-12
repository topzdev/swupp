const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "swupp.dev@gmail.com",
    pass: "swupp@123456789",
  },
});

module.exports = transporter;
