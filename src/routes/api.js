const express = require("express");
const studentsController = require("../controllers/studentsController");
const router = express.Router();

// User Manage
router.post("/registration", studentsController.studentRegistration);

module.exports = router;
