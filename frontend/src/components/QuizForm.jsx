import { useState } from "react";

import { useDispatch } from "react-redux";

import { createQuiz } from "../features/quiz/quizSlice";

import {
  FaBrain,
  FaPlus,
  FaCheckCircle,
  FaQuestionCircle,
  FaRocket,
} from "react-icons/fa";

const QuizForm = ({ groupId }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", ""],
      correctAnswer: "",
    },
  ]);

  const handleQuestionChange = (
    index,
    field,
    value
  ) => {
    const updated = [...questions];

    updated[index][field] = value;

    setQuestions(updated);
  };

  const handleOptionChange = (
    qIndex,
    oIndex,
    value
  ) => {
    const updated = [...questions];

    updated[qIndex].options[oIndex] = value;

    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", ""],
        correctAnswer: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await dispatch(
      createQuiz({
        title,
        group: groupId,
        questions,
      })
    );

    setTitle("");

    setQuestions([
      {
        question: "",
        options: ["", ""],
        correctAnswer: "",
      },
    ]);

    setLoading(false);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-2xl bg-green-500/20 p-4 text-green-400">
          <FaBrain className="text-2xl" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Create Quiz
          </h2>

          <p className="text-sm text-gray-400">
            Build interactive quizzes for your study group
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Quiz Title */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-300">
            Quiz Title
          </label>

          <div className="flex items-center rounded-2xl border border-white/10 bg-black/20 px-4 focus-within:border-green-500">
            <FaQuestionCircle className="text-gray-400" />

            <input
              type="text"
              placeholder="Enter quiz title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-transparent px-3 py-4 text-white placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="rounded-3xl border border-white/10 bg-black/20 p-5"
            >
              {/* Question Header */}
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  Question {qIndex + 1}
                </h3>

                <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  Quiz Question
                </div>
              </div>

              {/* Question Input */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-300">
                  Question
                </label>

                <input
                  type="text"
                  placeholder="Enter your question..."
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "question",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500"
                />
              </div>

              {/* Options */}
              <div className="grid gap-4">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <label className="mb-2 block text-sm text-gray-300">
                      Option {oIndex + 1}
                    </label>

                    <input
                      type="text"
                      placeholder={`Enter option ${
                        oIndex + 1
                      }`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          qIndex,
                          oIndex,
                          e.target.value
                        )
                      }
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500"
                    />
                  </div>
                ))}
              </div>

              {/* Correct Answer */}
              <div className="mt-5">
                <label className="mb-2 block text-sm text-gray-300">
                  Correct Answer
                </label>

                <div className="flex items-center rounded-2xl border border-green-500/20 bg-green-500/5 px-4 focus-within:border-green-500">
                  <FaCheckCircle className="text-green-400" />

                  <input
                    type="text"
                    placeholder="Enter correct answer..."
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(
                        qIndex,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                    className="w-full bg-transparent px-3 py-4 text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Add Question */}
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            <FaPlus />

            Add Question
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-green-500 to-emerald-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.01] disabled:opacity-60"
          >
            <FaRocket />

            {loading
              ? "Creating Quiz..."
              : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;