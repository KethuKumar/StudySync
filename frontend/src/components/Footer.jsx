import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaArrowUp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B1120] text-white">

      {/* Background Glow */}
      <div className="absolute left-[-25] top-[-25] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute bottom-[-30] right-[-30] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">

        {/* TOP */}
        <div className="grid gap-12 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 text-2xl font-black shadow-lg">
                S
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  StudySync
                </h2>

                <p className="text-sm text-gray-400">
                  Learn Together
                </p>
              </div>

            </div>

            <p className="mt-6 leading-relaxed text-gray-400">
              StudySync helps students collaborate in real-time
              through live chat, video rooms, quizzes, whiteboards,
              and shared study resources.
            </p>

            {/* SOCIALS */}
            <div className="mt-6 flex gap-4">

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-gray-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-gray-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-cyan-400"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-gray-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-sky-400"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-gray-300 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-indigo-400"
              >
                <FaDiscord />
              </a>

            </div>

          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-xl font-bold">
              Platform
            </h3>

            <div className="mt-6 space-y-4 text-gray-400">

              <Link
                to="/dashboard"
                className="block transition hover:text-blue-400"
              >
                Dashboard
              </Link>

              <Link
                to="/tutors"
                className="block transition hover:text-blue-400"
              >
                Tutors
              </Link>

              <Link
                to="/become-tutor"
                className="block transition hover:text-blue-400"
              >
                Become Tutor
              </Link>

              <Link
                to="/login"
                className="block transition hover:text-blue-400"
              >
                Login
              </Link>

            </div>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-xl font-bold">
              Features
            </h3>

            <div className="mt-6 space-y-4 text-gray-400">

              <p className="transition hover:text-blue-400">
                Real-Time Chat
              </p>

              <p className="transition hover:text-blue-400">
                Collaborative Whiteboard
              </p>

              <p className="transition hover:text-blue-400">
                Quiz & Leaderboards
              </p>

              <p className="transition hover:text-blue-400">
                Video Study Rooms
              </p>

              <p className="transition hover:text-blue-400">
                File Sharing
              </p>

            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-xl font-bold">
              Stay Updated
            </h3>

            <p className="mt-6 text-gray-400">
              Get product updates and new learning features.
            </p>

            {/* <div className="mt-6 flex flex-col gap-4">

              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-blue-500/40 focus:bg-white/[0.07]"
              />

              <button
                className="rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:from-blue-400 hover:to-cyan-400"
              >
                Subscribe
              </button>

            </div> */}

          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          <p className="text-center text-gray-400 md:text-left">
            © 2026 StudySync. Built for collaborative learning.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-400">

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <FaArrowUp />

              Back to Top
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;