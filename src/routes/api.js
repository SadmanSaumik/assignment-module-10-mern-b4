const express = require("express");
const studentsController = require("../controllers/studentsController");
const router = express.Router();

// Student Manage
router.post("/registration", studentsController.studentRegistration);
router.post("/login", studentsController.studentLogin);

module.exports = router;
