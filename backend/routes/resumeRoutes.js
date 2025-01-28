const express = require("express");
const { analyzeResume } = require("../controllers/resumeController");

const router = express.Router();

router.post("/analyze-resume", analyzeResume);

module.exports = router;
