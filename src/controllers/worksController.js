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

exports.updateWork = async (req, res) => {
  try {
    let id = req.params.id;
    let email = req.headers["email"];
    let query = { _id: id, email: email };
    let reqBody = req.body;
    let result = await worksModel.updateOne(query, reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

exports.listWorksByStatus = async (req, res) => {
  try {
    let status = req.params.status;
    let email = req.headers["email"];
    let result = await worksModel.find({ email: email, status: status });
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

exports.workStatusCount = async (req, res) => {
  try {
    let email = req.headers["email"];
    let result = await worksModel.aggregate([
      { $match: { email: email } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
