

import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { createquiz, getGroupquizzes, getLeaderboard, submitquiz } from '../controllers/quiz.controller.js'

const router = express.Router()

router.post("/", protect, createquiz);
router.get(
  "/group/:groupId",
  protect,
  getGroupquizzes
);

router.post(
  "/submit/:quizId",
  protect,
  submitquiz
);

router.get(
  "/leaderboard/:quizId",
  protect,
  getLeaderboard
);

export default router;