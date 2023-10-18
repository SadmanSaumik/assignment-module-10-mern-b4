const studentsModel = require("../models/studentsModel");
const jwt = require("jsonwebtoken");

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
