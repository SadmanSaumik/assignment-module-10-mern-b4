const worksModel = require("../models/worksModel");

exports.createWork = async (req, res) => {
  try {
    let reqBody = req.body;
    req.body.email = req.headers["email"];
    let result = await worksModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

exports.deleteWork = async (req, res) => {
  try {
    let id = req.params.id;
    let email = req.headers["email"];
    let result = await worksModel.deleteOne({ _id: id, email: email });
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
