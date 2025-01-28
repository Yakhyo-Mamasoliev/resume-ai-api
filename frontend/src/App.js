import React, { useState } from "react";
import ResumeInput from "./components/ResumeInput";
import AnalysisResult from "./components/AnalysisResult";

const App = () => {
	const [analysisResult, setAnalysisResult] = useState(null); // Store the result in state

	return (
		<div>
			<h1>AI Resume Analyzer</h1>
			<ResumeInput setAnalysisResult={setAnalysisResult} />
			{analysisResult && <AnalysisResult result={analysisResult} />}
		</div>
	);
};

export default App;
