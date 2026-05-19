import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaUserGraduate,
  FaUsers,
  FaVideo,
  FaBookOpen,
} from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await dispatch(registerUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1120] px-4 py-10">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>

      {/* Main Container */}
      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden flex-col justify-between bg-linear-to-br from-purple-600/20 to-blue-600/20 p-10 md:flex">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-purple-500 to-blue-500">
                <FaUserGraduate className="text-2xl text-white" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white">
                  StudySync
                </h1>

                <p className="text-sm text-gray-300">
                  Learn Together
                </p>
              </div>
            </div>

            {/* Heading */}
            <h2 className="mt-14 text-5xl font-extrabold leading-tight text-white">
              Join the future of collaborative learning.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Create study groups, join live rooms, share
              resources, and grow together with students
              worldwide.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <FaUsers className="text-purple-400" />

                <div>
                  <h4 className="font-semibold text-white">
                    Study Groups
                  </h4>

                  <p className="text-sm text-gray-400">
                    Collaborate with classmates in real time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <FaVideo className="text-blue-400" />

                <div>
                  <h4 className="font-semibold text-white">
                    Live Study Rooms
                  </h4>

                  <p className="text-sm text-gray-400">
                    Video sessions and collaborative whiteboards.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <FaBookOpen className="text-pink-400" />

                <div>
                  <h4 className="font-semibold text-white">
                    Shared Resources
                  </h4>

                  <p className="text-sm text-gray-400">
                    Upload notes, PDFs, and quizzes easily.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-sm leading-relaxed text-gray-300">
              “StudySync made our remote study sessions feel
              like we were sitting together in the same room.”
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-white">
                Computer Science Students
              </h4>

              <p className="text-sm text-gray-400">
                Collaborative Learning Community
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 sm:p-12">
          <div className="mx-auto max-w-md">
            {/* Heading */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white">
                Create Account 🚀
              </h2>

              <p className="mt-3 text-gray-400">
                Start your collaborative learning journey today.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name
                </label>

                <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-purple-500">
                  <FaUser className="text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent px-3 py-4 text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email Address
                </label>

                <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-purple-500">
                  <FaEnvelope className="text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-4 text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Password
                </label>

                <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-purple-500">
                  <FaLock className="text-gray-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full bg-transparent px-3 py-4 text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <FaArrowRight />}
              </button>
            </form>

            {/* Bottom Text */}
            <p className="mt-8 text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-purple-400 transition hover:text-purple-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;