import React, { useState } from "react";
import api from "../api";

const ResumeInput = ({ setAnalysisResult }) => {
	const [resumeText, setResumeText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/analyze-resume", { resumeText });
			setAnalysisResult(response.data); // Set the structured result
		} catch (error) {
			console.error("Error analyzing resume:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				placeholder="Enter your resume text"
				value={resumeText}
				onChange={(e) => setResumeText(e.target.value)}
				rows="10"
				cols="50"
			/>
			<button type="submit">Analyze Resume</button>
		</form>
	);
};

export default ResumeInput;
