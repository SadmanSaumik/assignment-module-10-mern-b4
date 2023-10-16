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
      //Login Success
      res.status(200).json({ status: "success", data: result });
    } else {
      // Login fail
      res.status(200).json({ status: "fail", data: "No User Found" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
