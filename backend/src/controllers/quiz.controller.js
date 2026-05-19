import Quiz from "../models/quiz.js";
import QuizAttempt from "../models/quizAttempt.js";

// Create quiz
export const createquiz = async (req, res) => {
  try {
    const { title, group, questions } = req.body;

    const createdQuiz = await Quiz.create({
      title,
      group,
      questions,
      createdBy: req.user,
    });

    return res.status(201).json(createdQuiz);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get group quizzes
export const getGroupquizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      group: req.params.groupId,
    });

    return res.json(quizzes);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Submit quiz
export const submitquiz = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        message: "answers must be an array",
      });
    }

    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "quiz not found",
      });
    }

    let score = 0;

    quiz.questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        score++;
      }
    });

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      user: req.user,
      score,
    });

    return res.json({
      score,
      total: quiz.questions.length,
      attempt,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await QuizAttempt.find({
      quiz: req.params.quizId,
    })
      .populate("user", "name")
      .sort({ score: -1 });

    return res.json(leaderboard);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
