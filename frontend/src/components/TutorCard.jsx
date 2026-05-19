import {
  FaStar,
  FaClock,
  FaVideo,
  FaCalendarCheck,
  FaChalkboardTeacher,
} from "react-icons/fa";

const TutorCard = ({
  tutor,
  onBook,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-[4xl] border border-white/10 bg-linear-to-br from-[#111827] to-[#0F172A] p-6 shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-blue-500/30">
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      {/* TOP */}
      <div className="relative flex items-start justify-between gap-4">
        {/* PROFILE */}
        <div className="flex items-center gap-4">
          <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-blue-500/15 text-3xl text-blue-400">
            <FaChalkboardTeacher />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              {tutor.name}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Verified StudySync Tutor
            </p>
          </div>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-sm text-yellow-300">
          <FaStar />

          4.9
        </div>
      </div>

      {/* PRICE CARD */}
      <div className="relative mt-6 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-5">
        <p className="text-sm uppercase tracking-wide text-blue-300">
          Hourly Rate
        </p>

        <div className="mt-2 flex items-end gap-2">
          <h3 className="text-5xl font-black text-white">
            ₹
            {tutor.hourlyRate}
          </h3>

          <span className="mb-1 text-gray-400">
            / hour
          </span>
        </div>
      </div>

      {/* FEATURES */}
      <div className="relative mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
          <FaVideo className="mx-auto text-lg text-blue-400" />

          <p className="mt-2 text-xs text-gray-400">
            Live Calls
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
          <FaClock className="mx-auto text-lg text-green-400" />

          <p className="mt-2 text-xs text-gray-400">
            Flexible
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
          <FaCalendarCheck className="mx-auto text-lg text-pink-400" />

          <p className="mt-2 text-xs text-gray-400">
            Booking
          </p>
        </div>
      </div>

      {/* SKILLS */}
      <div className="relative mt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Skills & Subjects
        </h3>

        <div className="flex flex-wrap gap-2">
          {tutor.skills?.map(
            (skill, index) => (
              <span
                key={index}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-300"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          onBook(tutor)
        }
        className="relative mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:from-blue-400 hover:to-cyan-400"
      >
        <FaCalendarCheck />

        Book Session
      </button>
    </div>
  );
};

export default TutorCard;