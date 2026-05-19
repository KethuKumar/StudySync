import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchQuizzes,
} from "../features/quiz/quizSlice";

import QuizCard from "./QuizCard";

import {
  FaBrain,
  FaClipboardList,
} from "react-icons/fa";

const QuizList = ({
  groupId,
  onPlay,
}) => {
  const dispatch = useDispatch();

  const { quizzes } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchQuizzes(groupId));
  }, [dispatch, groupId]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Available Quizzes
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Practice and challenge your study group
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
          {quizzes.length} Quiz
          {quizzes.length !== 1 && "zes"}
        </div>
      </div>

      {/* Empty State */}
      {quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 py-14 text-center backdrop-blur-xl">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <FaBrain className="text-3xl text-green-400" />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-white">
            No Quizzes Yet
          </h3>

          <p className="mt-3 max-w-sm text-gray-400">
            Create your first quiz and start testing
            your team's knowledge together.
          </p>
        </div>
      ) : (
        /* Quiz Grid */
        <div className="grid gap-5">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="rounded-3xl border border-white/10 bg-white/5 p-1 transition hover:border-green-500/30 hover:bg-white/[0.07]"
            >
              <QuizCard
                quiz={quiz}
                onPlay={onPlay}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      {quizzes.length > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-green-500/10 bg-green-500/5 px-4 py-3 text-sm text-green-300">
          <FaClipboardList />

          Click on any quiz card to start playing and
          compete on the leaderboard.
        </div>
      )}
    </div>
  );
};

export default QuizList;