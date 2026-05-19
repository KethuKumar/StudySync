import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGroups, joinGroup } from "../features/group/groupSlice";

import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";

import {
  FaPlus,
  FaUsers,
  FaArrowRight,
  FaBookOpen,
  FaVideo,
  FaBrain,
} from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { groups } = useSelector((state) => state.groups);

  const [showModal, setShowModal] = useState(false);

  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleJoin = async () => {
    if (!inviteCode) return;

    await dispatch(joinGroup(inviteCode));

    setInviteCode("");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <div className="mx-auto max-w-7xl p-6">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-r from-purple-600/20 to-blue-600/20 p-8 shadow-2xl backdrop-blur-xl">
          {/* Glow */}
          <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl"></div>

          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div>
              <div className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur">
                Your collaborative workspace
              </div>

              <h1 className="mt-5 text-5xl font-extrabold leading-tight">
                Welcome to your
                <span className="block bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Study Dashboard
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-gray-300">
                Manage your study groups, join live sessions,
                collaborate with friends, and track your learning
                progress in one place.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-sm text-gray-400">
                    Total Groups
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    {groups.length}
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-sm text-gray-400">
                    Active Rooms
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    12
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                  <p className="text-sm text-gray-400">
                    Resources Shared
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    48
                  </h3>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 px-6 py-4 font-semibold text-white transition hover:scale-[1.02]"
              >
                <FaPlus />
                Create New Group
              </button>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <h3 className="mb-4 font-semibold text-white">
                  Quick Features
                </h3>

                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-purple-400" />
                    Real-time collaboration
                  </div>

                  <div className="flex items-center gap-3">
                    <FaVideo className="text-blue-400" />
                    Live study rooms
                  </div>

                  <div className="flex items-center gap-3">
                    <FaBookOpen className="text-pink-400" />
                    Shared resources
                  </div>

                  <div className="flex items-center gap-3">
                    <FaBrain className="text-green-400" />
                    Quiz & flashcards
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JOIN GROUP */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Join a Study Group
            </h2>

            <p className="mt-2 text-gray-400">
              Enter an invite code shared by your friends or classmates.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Enter invite code..."
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-purple-500"
            />

            <button
              onClick={handleJoin}
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 font-semibold text-white transition hover:bg-green-600"
            >
              Join Group
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* GROUP SECTION */}
        <div className="mt-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Your Study Groups
              </h2>

              <p className="mt-2 text-gray-400">
                Continue collaborating with your learning communities.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300 backdrop-blur-xl md:block">
              {groups.length} Active Groups
            </div>
          </div>

          {/* EMPTY STATE */}
          {groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
                <FaUsers className="text-3xl text-purple-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                No Study Groups Yet
              </h3>

              <p className="mt-3 max-w-md text-gray-400">
                Create your first study group and start collaborating
                with classmates in real time.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-6 rounded-2xl bg-linear-to-r from-purple-500 to-blue-500 px-6 py-3 font-semibold transition hover:scale-[1.02]"
              >
                Create Your First Group
              </button>
            </div>
          ) : (
            /* GROUP GRID */
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {groups.map((group) => (
                <GroupCard
                  key={group._id}
                  group={group}
                />
              ))}
            </div>
          )}
        </div>

        {/* MODAL */}
        {showModal && (
          <CreateGroupModal
            closeModal={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;