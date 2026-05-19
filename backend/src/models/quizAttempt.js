import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({

  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  score: Number

}, { timestamps: true });

export default mongoose.model(
  "QuizAttempt",
  quizAttemptSchema
);