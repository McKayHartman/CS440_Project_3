const express = require("express");
const router = express.Router();
const textModel = require("../model/textModel");

// GET user's single note
router.get("/", (req, res) => {
    const userId = req.headers["x-user-id"];

    textModel.getNoteByUserId(userId, (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch note" });
        }

        res.json(row || { content: "" });
    });
});

// UPDATE user's note (overwrite)
router.put("/", (req, res) => {
    const userId = req.headers["x-user-id"];
    const content = req.body.content;

    if (!content && content !== "") {
        return res.status(400).json({ error: "Content is required" });
    }

    textModel.upsertNote(userId, content, (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to save note" });
        }

        res.json({ message: "Note saved successfully" });
    });
});

module.exports = router;