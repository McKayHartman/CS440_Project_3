const express = require("express");
const textRoutes = require("./routes/textRoutes");

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());

// Optional: simple request logger
app.use((req, res, next) => {
    console.log(`[TEXT SERVICE] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/text", textRoutes);

// Health check (VERY useful for testing)
app.get("/health", (req, res) => {
    res.json({ status: "text-service is running" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Text service running on http://localhost:${PORT}`);
});