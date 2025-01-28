const express = require("express");
const { analyzeResume } = require("../controllers/resumeController");

const router = express.Router();

// Route to analyze resume
router.post("/analyze-resume", analyzeResume);

module.exports = router;
