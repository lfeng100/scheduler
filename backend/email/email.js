const nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fc4cc00f034f91",
    pass: "efcdeeda31a327"
  }
});