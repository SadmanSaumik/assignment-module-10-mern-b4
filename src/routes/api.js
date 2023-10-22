const express = require("express");
const studentsController = require("../controllers/studentsController");
const worksController = require("../controllers/worksController");
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

router.get(
  "/recoveryemailverify/:email",
  studentsController.recoveryEmailVerify
);

router.post("/recoveryotpverify", studentsController.recoveryOtpVerify);
router.post("/resetpassword", studentsController.resetPassword);

//Works Manage
router.post("/createtask", authVerifyMiddleware, worksController.createWork);
router.delete(
  "/deletetask/:id",
  authVerifyMiddleware,
  worksController.deleteWork
);

module.exports = router;
