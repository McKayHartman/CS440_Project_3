const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    userModel.createUser(username, password, (err, user) => {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(409).json({ error: "Username already exists" });
            }
            return res.status(500).json({ error: "Failed to register user" });
        }
        res.status(201).json({ message: "User registered successfully", user });
    });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    userModel.getUserByCredentials(username, password, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Failed to login" });
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.json({ message: "Login successful", user });
    });
});

module.exports = router;
