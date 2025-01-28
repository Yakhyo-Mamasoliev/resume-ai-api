const axios = require("axios");
const delay = require("../utils/delay");

const analyzeResume = async (req, res) => {
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
					inputs: `Please review and suggest improvements for this resume:\n\n${resumeText}`,
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
				await delay(response.data.estimated_time * 1000);
				retries--;
			} else {
				break;
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
};

module.exports = { analyzeResume };
