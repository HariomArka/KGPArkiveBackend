const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    askedBy: {
      type: String, // username of the person who asked
      required: true,
      trim: true,
    },
    answers: [answerSchema], // array of answers
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
