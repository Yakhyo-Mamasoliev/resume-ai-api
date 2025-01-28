import React, { useState } from "react";
import ResumeInput from "./components/ResumeInput";
import AnalysisResult from "./components/AnalysisResult";

const App = () => {
	const [analysisResult, setAnalysisResult] = useState("");

	return (
		<div>
			<h1>AI Resume Analyzer</h1>
			<ResumeInput setAnalysisResult={setAnalysisResult} />
			{analysisResult && <AnalysisResult result={analysisResult} />}
		</div>
	);
};

export default App;
