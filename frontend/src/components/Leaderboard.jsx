import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchLeaderboard,
} from "../features/quiz/quizSlice";

import {
  FaTrophy,
  FaMedal,
  FaCrown,
  FaStar,
} from "react-icons/fa";

const Leaderboard = ({ quizId }) => {
  const dispatch = useDispatch();

  const { leaderboard } =
    useSelector(
      (state) => state.quiz
    );

  useEffect(() => {
    dispatch(
      fetchLeaderboard(quizId)
    );
  }, [dispatch, quizId]);

  const getRankStyle = (index) => {
    if (index === 0) {
      return "border-yellow-500/30 bg-yellow-500/10";
    }

    if (index === 1) {
      return "border-gray-400/30 bg-gray-400/10";
    }

    if (index === 2) {
      return "border-orange-500/30 bg-orange-500/10";
    }

    return "border-white/10 bg-white/5";
  };

  const getRankIcon = (index) => {
    if (index === 0) {
      return (
        <FaCrown className="text-yellow-400" />
      );
    }

    if (index === 1) {
      return (
        <FaMedal className="text-gray-300" />
      );
    }

    if (index === 2) {
      return (
        <FaMedal className="text-orange-400" />
      );
    }

    return (
      <FaStar className="text-purple-400" />
    );
  };

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-2xl bg-yellow-500/20 p-4 text-yellow-400">
          <FaTrophy className="text-2xl" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            Leaderboard
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Top performers in this quiz
          </p>
        </div>
      </div>

      {/* Empty State */}
      {leaderboard.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-black/20 py-14 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">
            <FaTrophy className="text-3xl text-yellow-400" />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-white">
            No Scores Yet
          </h3>

          <p className="mt-3 max-w-sm text-gray-400">
            Complete the quiz to appear on the
            leaderboard and compete with your
            teammates.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leaderboard.map(
            (entry, index) => (
              <div
                key={entry._id}
                className={`flex items-center justify-between rounded-2xl border p-4 transition hover:scale-[1.01] ${getRankStyle(
                  index
                )}`}
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-lg font-bold text-white">
                    #{index + 1}
                  </div>

                  {/* User */}
                  <div>
                    <div className="flex items-center gap-2">
                      {getRankIcon(index)}

                      <h3 className="font-semibold text-white">
                        {
                          entry.user
                            ?.name
                        }
                      </h3>
                    </div>

                    <p className="mt-1 text-sm text-gray-400">
                      Quiz Participant
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <h3 className="text-2xl font-bold text-white">
                    {entry.score}
                  </h3>

                  <p className="text-sm text-gray-400">
                    points
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Footer */}
      {leaderboard.length > 0 && (
        <div className="mt-6 rounded-2xl border border-purple-500/10 bg-purple-500/5 px-4 py-3 text-sm text-purple-300">
          Keep practicing and climb to the
          top of the leaderboard 🚀
        </div>
      )}
    </div>
  );
};

export default Leaderboard;