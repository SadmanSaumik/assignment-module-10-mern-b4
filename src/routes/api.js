const express = require("express");
const studentsController = require("../controllers/studentsController");
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");
const router = express.Router();

// Student Manage
router.post("/registration", studentsController.studentRegistration);
router.post("/login", studentsController.studentLogin);

router.get(
  "/profiledetails",
  authVerifyMiddleware,
  studentsController.profileDetails
);
router.post(
  "/profileupdate",
  authVerifyMiddleware,
  studentsController.profileUpdate
);
module.exports = router;
