import api from "./api";

// Example of sending resume text for analysis
const analyzeResume = async (resumeText) => {
	try {
		const response = await api.post("/analyze-resume", { resumeText });
		console.log("Analysis Result:", response.data);
	} catch (error) {
		console.error("Error analyzing resume:", error);
	}
};

export default analyzeResume;
