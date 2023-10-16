const studentsModel = require("../models/studentsModel");
const jwt = require("jsonwebtoken");

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
