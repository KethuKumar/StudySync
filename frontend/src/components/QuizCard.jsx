import {
  FaBrain,
  FaPlay,
  FaQuestionCircle,
  FaTrophy,
} from "react-icons/fa";

const QuizCard = ({
  quiz,
  onPlay,
}) => {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br from-[#111827] to-[#0F172A] p-6 shadow-2xl transition duration-300 hover:border-green-500/30">
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />

      {/* TOP */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-green-500/15 p-4 text-green-400">
            <FaBrain className="text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {quiz.title}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Interactive group quiz
            </p>
          </div>
        </div>

        <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
          Live
        </div>
      </div>

      {/* STATS */}
      <div className="relative mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-blue-400">
            <FaQuestionCircle />
            <span className="text-sm font-medium">
              Questions
            </span>
          </div>

          <h3 className="mt-2 text-3xl font-black text-white">
            {quiz.questions.length}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-yellow-400">
            <FaTrophy />
            <span className="text-sm font-medium">
              Challenge
            </span>
          </div>

          <h3 className="mt-2 text-lg font-bold text-white">
            Team Mode
          </h3>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => onPlay(quiz)}
        className="relative mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-green-500 to-emerald-600 px-5 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:from-green-400 hover:to-emerald-500"
      >
        <FaPlay />

        Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;