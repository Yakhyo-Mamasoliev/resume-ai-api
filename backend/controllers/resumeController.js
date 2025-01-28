const axios = require("axios");
const delay = require("../utils/delay");

const analyzeResume = async (req, res) => {
	const { resumeText } = req.body;

	if (!resumeText) {
		return res.status(400).json({ error: "Resume text is required" });
	}

	try {
		// TextRazor API endpoint and your API key
		const apiKey = process.env.TEXTRAZOR_API_KEY; // Store your API key securely in the .env file
		const url = "https://api.textrazor.com/";

		const response = await axios.post(
			url,
			{
				// Parameters to be sent in the request
				text: resumeText,
				extractors: ["entities", "keywords", "topics"], // You can extract entities, keywords, and topics
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"X-TextRazor-Key": apiKey, // Your API Key
				},
			}
		);

		if (response.data && response.data.response) {
			res.json({ analysis: response.data.response });
		} else {
			res
				.status(500)
				.json({ error: "Failed to analyze resume with TextRazor" });
		}
	} catch (error) {
		console.error("TextRazor API Error:", error.message);
		res.status(500).json({
			error: error.message,
			details: error.response?.data || "Text analysis failed",
		});
	}
};

module.exports = { analyzeResume };
