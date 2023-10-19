const studentsModel = require("../models/studentsModel");
const jwt = require("jsonwebtoken");
const sendEmailUtility = require("../utility/sendEmailUtility");
const otpModel = require("../models/otpModel");

//Student Registration
exports.studentRegistration = async (req, res) => {
  let reqBody = req.body;
  console.log(req.body);
  try {
    let result = await studentsModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

//Student Login

exports.studentLogin = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await studentsModel.find(req.body).count();
    if (result === 1) {
      // Create Token
      let payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: req.body["email"],
      };
      let token = jwt.sign(payload, "SecretKey123456789");
      //Login Success
      res.status(200).json({ status: "success", data: token });
    } else {
      // Login fail
      res.status(200).json({ status: "fail", data: "No User Found" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

// Student Profile Details

exports.profileDetails = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await studentsModel.find({ email: email });
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

// Student Profile Update

exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    let result = await studentsModel.updateOne({ email: email }, reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

//Forget Password - Recovery Email Verification and OPT Send to verified email

exports.recoveryEmailVerify = async (req, res) => {
  try {
    let email = req.params.email;
    let otpCode = Math.floor(100000 + Math.random() * 900000);
    let emailText = `Your Verification Code is ${otpCode}`;
    let emailSubject = "Student Management verification code";
    let result = await studentsModel.find({ email: email }).count();
    if (result === 1) {
      //Sending verification code
      await sendEmailUtility(email, emailText, emailSubject);
      await otpModel.create({ email: email, otp: otpCode });
      res.status(200).json({
        status: "success",
        data: "6 Digit Verification Code has been sent",
      });
    } else {
      res.status(200).json({ status: "fail", data: "No User Found" });
    }
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

//Forget Password - Recovery otp Verification
exports.recoveryOtpVerify = async (req, res) => {
  try {
    let email = req.body["email"];
    let otp = req.body["otp"];
    let status = 0;
    let statusUpdate = 1;
    let result = await otpModel
      .find({
        email: email,
        otp: otp,
        status: status,
      })
      .count();
    if (result === 1) {
      await otpModel.updateOne(
        { email: email, otp: otp, status: status },
        { status: statusUpdate }
      );
      res
        .status(200)
        .json({ status: "success", data: "Verification Completed" });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid Verification" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
//Forget Password - Password Reset and update in DB
exports.resetPassword = async (req, res) => {
  try {
    let email = req.body["email"];
    let otp = req.body["otp"];
    let newPassword = req.body["password"];
    let statusUpdate = 1;
    let result = await otpModel
      .find({
        email: email,
        otp: otp,
        status: statusUpdate,
      })
      .count();
    if (result === 1) {
      let result = await studentsModel.updateOne(
        { email: email },
        { password: newPassword }
      );
      res
        .status(200)
        .json({ status: "success", data: "Password Reset Success" });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid Verification" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
