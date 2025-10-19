const Question = require('../models/Question');
const mongoose = require('mongoose');

// Get all questions - simple approach, let frontend sort
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({})
      .sort({ createdAt: -1 }); // Just sort by newest first
    
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get questions asked by a specific user
const getMyQuestions = async (req, res) => {
  const { username } = req.params;
  try {
    const questions = await Question.find({ askedBy: username }).sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new question
const createQuestion = async (req, res) => {
  const { question, askedBy } = req.body;
  try {
    const newQuestion = await Question.create({ question, askedBy });
    res.status(200).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid question ID' });
  }
  try {
    const deleted = await Question.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update question text
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid question ID' });
  }
  try {
    const updated = await Question.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add an answer to a question
const addAnswer = async (req, res) => {
  const { id } = req.params;
  const { username, answer } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid question ID' });
  }

  try {
    const updated = await Question.findByIdAndUpdate(
      id,
      { $push: { answers: { username, answer } } },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getQuestions,
  getMyQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
  addAnswer,
};
