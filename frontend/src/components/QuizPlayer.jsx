import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  submitQuiz,
} from "../features/quiz/quizSlice";

import {
  FaBrain,
  FaCheckCircle,
  FaRocket,
  FaTrophy,
  FaQuestionCircle,
} from "react-icons/fa";

const QuizPlayer = ({ quiz }) => {
  const dispatch = useDispatch();

  const { result } = useSelector(
    (state) => state.quiz
  );

  const [answers, setAnswers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleSelect = (
    qIndex,
    option
  ) => {
    const updated = [...answers];

    updated[qIndex] = option;

    setAnswers(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);

    await dispatch(
      submitQuiz({
        quizId: quiz._id,
        answers,
      })
    );

    setLoading(false);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-green-500/20 p-4 text-green-400">
          <FaBrain className="text-2xl" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            {quiz.title}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Answer all questions and test your
            knowledge
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {quiz.questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="rounded-3xl border border-white/10 bg-black/20 p-5"
          >
            {/* Question Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400">
                <FaQuestionCircle />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Question {qIndex + 1}
                </p>

                <h3 className="text-lg font-semibold text-white">
                  {q.question}
                </h3>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSelect(
                      qIndex,
                      option
                    )
                  }
                  className={`group flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                    answers[qIndex] === option
                      ? "border-green-500 bg-green-500/10 text-white"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-green-500/30 hover:bg-white/10"
                  }`}
                >
                  <span className="font-medium">
                    {option}
                  </span>

                  {answers[qIndex] === option && (
                    <FaCheckCircle className="text-green-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-green-500 to-emerald-500 py-4 font-semibold text-white transition hover:scale-[1.01] disabled:opacity-60"
      >
        <FaRocket />

        {loading
          ? "Submitting Quiz..."
          : "Submit Quiz"}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-yellow-500/20 p-4 text-yellow-400">
              <FaTrophy className="text-2xl" />
            </div>

            <div>
              <p className="text-sm text-yellow-200">
                Quiz Result
              </p>

              <h3 className="text-3xl font-bold text-white">
                {result.score} / {result.total}
              </h3>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="mb-2 flex justify-between text-sm text-gray-300">
              <span>Performance</span>

              <span>
                {Math.round(
                  (result.score /
                    result.total) *
                    100
                )}
                %
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-linear-to-r from-yellow-400 to-green-400"
                style={{
                  width: `${
                    (result.score /
                      result.total) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPlayer;