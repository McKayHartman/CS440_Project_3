const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5002;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[USER LOGIN SERVICE] ${req.method} ${req.url}`);
    next();
});

app.use("/", userRoutes);
app.use("/users", userRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "user-login-service is running" });
});

// Root check
app.get("/", (req, res) => {
    res.send("User Login Service is running. Use /users/login or /users/register.");
});

// Start server
app.listen(PORT, () => {
    console.log(`User Login Service running on http://localhost:${PORT}`);
});
