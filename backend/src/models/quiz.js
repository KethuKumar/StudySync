import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  
  question: {
    type: String,
    required: true
  },

  options: [String],

  correctAnswer: {
    type: String,
    required: true
  }

});

const quizSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  questions: [questionSchema]

}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);