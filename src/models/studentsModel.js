const mongoose = require("mongoose");
const dataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String, unique: true },
    password: { type: String },
    address: { type: String },
    roll: { type: String },
    class: { type: String },
  },
  { timestamps: true, versionKey: false }
);
const studentsModel = mongoose.model("students", dataSchema);
module.exports = studentsModel;
