import { useState } from "react";

import api from "../services/api";

import toast from "react-hot-toast";

import {
  FaChalkboardTeacher,
  FaRupeeSign,
  FaCode,
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";

const TutorProfileForm = () => {

  const [hourlyRate,
    setHourlyRate] = useState("");

  const [skills,
    setSkills] = useState("");

  const [bio,
    setBio] = useState("");

  const [loading,
    setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.patch(
        "/users/tutor-profile",

        {
          hourlyRate,

          skills:
            skills
              .split(","),

          bio
        }
      );

      toast.success(
        "Tutor profile updated"
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-[#0B1120] px-4 py-10 text-white">

      <div className="mx-auto max-w-3xl overflow-hidden rounded-[36px] border border-white/10 bg-linear-to-br from-[#111827] to-[#0F172A] shadow-2xl">

        {/* TOP SECTION */}
        <div className="relative overflow-hidden border-b border-white/10 p-8">

          {/* Glow */}
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/15 text-4xl text-blue-400">
                <FaChalkboardTeacher />
              </div>

              <div>

                <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
                  StudySync Marketplace
                </p>

                <h1 className="mt-2 text-4xl font-black">
                  Become a Tutor
                </h1>

                <p className="mt-3 max-w-xl text-gray-400">
                  Share your knowledge, help students grow,
                  and earn by teaching your favorite subjects.
                </p>

              </div>

            </div>

            <div className="rounded-3xl border border-green-500/20 bg-green-500/10 px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="text-green-400">
                  <FaCheckCircle />
                </div>

                <div>
                  <p className="text-sm text-gray-300">
                    Verified Tutor
                  </p>

                  <h3 className="font-bold text-white">
                    Marketplace Ready
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 p-8"
        >

          {/* HOURLY RATE */}
          <div>

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-300">
              <FaRupeeSign className="text-green-400" />

              Hourly Rate
            </label>

            <div className="relative">

              <input
                type="number"

                placeholder="Enter your hourly rate"

                value={hourlyRate}

                onChange={(e) =>
                  setHourlyRate(
                    e.target.value
                  )
                }

                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg text-white outline-none transition focus:border-green-500/40 focus:bg-white/[0.07]"
              />

            </div>

          </div>


          {/* SKILLS */}
          <div>

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-300">
              <FaCode className="text-blue-400" />

              Skills & Subjects
            </label>

            <input
              type="text"

              placeholder="React, Node.js, DSA, Java"

              value={skills}

              onChange={(e) =>
                setSkills(
                  e.target.value
                )
              }

              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-blue-500/40 focus:bg-white/[0.07]"
            />

            <p className="mt-3 text-sm text-gray-500">
              Separate multiple skills with commas
            </p>

          </div>


          {/* BIO */}
          <div>

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-300">
              <FaUserGraduate className="text-pink-400" />

              Tutor Bio
            </label>

            <textarea

              rows="6"

              placeholder="Tell students about your teaching experience, expertise, and study style..."

              value={bio}

              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }

              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-pink-500/40 focus:bg-white/[0.07]"
            />

          </div>


          {/* INFO BOX */}
          <div className="rounded-3xl border border-blue-500/10 bg-blue-500/5 p-5">

            <h3 className="text-lg font-bold text-white">
              Why become a StudySync tutor?
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="font-semibold text-blue-300">
                  Earn Money
                </h4>

                <p className="mt-2 text-sm text-gray-400">
                  Set your own hourly rate and schedule.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="font-semibold text-green-300">
                  Teach Live
                </h4>

                <p className="mt-2 text-sm text-gray-400">
                  Conduct collaborative video study sessions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="font-semibold text-pink-300">
                  Build Reputation
                </h4>

                <p className="mt-2 text-sm text-gray-400">
                  Grow your profile with reviews and learners.
                </p>
              </div>

            </div>

          </div>


          {/* BUTTON */}
          <button
            type="submit"

            disabled={loading}

            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.01] hover:from-blue-400 hover:to-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >

            {loading
              ? "Saving Profile..."
              : "Save Tutor Profile"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default TutorProfileForm;