import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { BookOpen, Users, Video, Brain } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
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

    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10">       

        {/* Hero Section */}
        <section className="grid min-h-[85vh] items-center gap-14 md:grid-cols-2">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur">
              Real-time collaborative learning platform
            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
              Study together
              <span className="block bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                from anywhere
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
              Create study groups, collaborate on whiteboards, join live video
              sessions, share resources, and compete in quizzes — all in one
              powerful workspace.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <Users className="mb-3 text-purple-400" />
                <h3 className="font-semibold">Study Groups</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Collaborate with classmates in real time.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <Video className="mb-3 text-blue-400" />
                <h3 className="font-semibold">Video Rooms</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Join live study sessions instantly.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <BookOpen className="mb-3 text-pink-400" />
                <h3 className="font-semibold">Resource Sharing</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Upload notes, PDFs, and assignments.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <Brain className="mb-3 text-green-400" />
                <h3 className="font-semibold">Smart Quizzes</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Practice with flashcards and leaderboards.
                </p>
              </div>
            </div>
          </div>

          {/* Right Login Card */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl"></div>

            <div className="relative rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
              {user ? (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-3xl font-bold">
                    {user.name?.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold">
                      Welcome back 👋
                    </h2>

                    <p className="mt-2 text-gray-300">
                      Ready to continue your study session?
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 py-3 font-semibold transition hover:scale-[1.02]"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold">
                      Welcome Back
                    </h2>

                    <p className="mt-2 text-gray-400">
                      Login to continue your collaborative learning journey.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none transition focus:border-purple-500"
                    />

                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 outline-none transition focus:border-purple-500"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 py-3 font-semibold transition hover:scale-[1.02] disabled:opacity-60"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-gray-400">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      className="font-semibold text-purple-400 hover:text-purple-300"
                    >
                      Create one
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;