const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin"); // create middleware to check if admin

// Get all users (admin only)
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notes (admin only)
router.get("/notes", auth, admin, async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete note by id (admin only)
router.delete("/notes/:id", auth, admin, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
