const studentsModel = require("../models/studentsModel");

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
