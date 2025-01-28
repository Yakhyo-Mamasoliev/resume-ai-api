const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Delay function for retries
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API endpoint to analyze resumes
app.post("/api/analyze-resume", async (req, res) => {
	const { resumeText } = req.body;

	if (!resumeText) {
		return res.status(400).json({ error: "Resume text is required" });
	}

	try {
		let retries = 3; // Number of retry attempts
		let response;

		while (retries > 0) {
			response = await axios.post(
				"https://api-inference.huggingface.co/models/gpt2",
				{
					inputs: `Analyze this resume and suggest improvements: ${resumeText}`,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
					},
				}
			);

			if (response.status === 503 && response.data?.estimated_time) {
				console.log(
					`Model loading, retrying in ${response.data.estimated_time} seconds...`
				);
				await delay(response.data.estimated_time * 1000); // Wait for the estimated time
				retries--;
			} else {
				break; // Exit loop if no 503
			}
		}

		if (response.data && response.data[0]?.generated_text) {
			res.json({ analysis: response.data[0].generated_text });
		} else {
			res
				.status(500)
				.json({ error: "Unexpected response from Hugging Face API" });
		}
	} catch (error) {
		console.error("Hugging Face API Error:", error.message);

		res.status(500).json({
			error: error.message,
			details: error.response?.data || "AI analysis failed",
		});
	}
});

// Test route to check server status
app.get("/", (req, res) => {
	res.send("Resume AI API is running...");
});

// Start server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
