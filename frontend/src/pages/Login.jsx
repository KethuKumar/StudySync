import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaUserGraduate,
} from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1120] px-4">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>

      {/* Main Container */}
      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-between bg-linear-to-br from-purple-600/20 to-blue-600/20 p-10 md:flex">
          <div>
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

            <h2 className="mt-14 text-5xl font-extrabold leading-tight text-white">
              Your collaborative study workspace.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Join live study rooms, collaborate on whiteboards,
              share resources, and learn smarter with your peers.
            </p>
          </div>

          {/* <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-sm leading-relaxed text-gray-300">
              “StudySync completely changed how our study group
              collaborates remotely.”
            </p>

            <div className="mt-4">
              <h4 className="font-semibold text-white">
                Engineering Students
              </h4>

              <p className="text-sm text-gray-400">
                IIT Collaborative Group
              </p>
            </div>
          </div> */}
        </div>

        {/* Right Side */}
        <div className="p-8 sm:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white">
                Welcome Back 👋
              </h2>

              <p className="mt-3 text-gray-400">
                Login to continue your learning journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-4 text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
                {!loading && <FaArrowRight />}
              </button>
            </form>

            {/* Bottom Text */}
            <p className="mt-8 text-center text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-purple-400 transition hover:text-purple-300"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;