const express = require("express");
const {
  getQuestions,
  getMyQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  addAnswer,
} = require("../controllers/questionController");

const router = express.Router();

// ✅ Get all answered questions
router.get("/", getQuestions);

// ✅ Get questions by a specific user
router.get("/user/:username", getMyQuestions);

// ✅ Submit a new question
router.post("/", createQuestion);

// ✅ Add an answer to a question
router.post("/:id/answer", addAnswer);

// ✅ Update a question (e.g., edit text)
router.put("/:id", updateQuestion);

// ✅ Delete a question
router.delete("/:id", deleteQuestion);

module.exports = router;
