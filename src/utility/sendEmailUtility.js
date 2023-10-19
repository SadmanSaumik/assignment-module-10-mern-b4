const nodemailer = require("nodemailer");
const sendEmailUtility = async (emailTo, emailText, emailSubject) => {
  let transporter = nodemailer.createTransport({
    host: "sadmansaumik.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@sadmansaumik.com",
      pass: "Xs4I4%Be$_nK",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "Student Management MERN <info@sadmansaumik.com>",
    to: emailTo,
    subject: emailSubject,
    text: emailText,
  };
  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmailUtility;
