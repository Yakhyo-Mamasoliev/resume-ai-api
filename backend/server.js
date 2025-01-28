const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resumeRoutes");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", resumeRoutes);

// Test route to check server status
app.get("/", (req, res) => {
	res.send("Resume AI API is running...");
});

// Start server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
