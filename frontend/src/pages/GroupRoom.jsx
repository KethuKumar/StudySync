import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import {
  FaComments,
  FaPaintBrush,
  FaFolderOpen,
  FaBrain,
  FaVideo,
} from "react-icons/fa";

import ChatBox from "../components/ChatBox";
import Whiteboard from "../components/Whiteboard";
import ResourceUpload from "../components/ResourceUpload";
import ResourceList from "../components/ResourceList";
import QuizForm from "../components/QuizForm";
import QuizList from "../components/QuizList";
import QuizPlayer from "../components/QuizPlayer";
import Leaderboard from "../components/Leaderboard";
import VideoRoom from "../components/VideoRoom";

const GroupRoom = () => {
  const [selectedQuiz, setSelectedQuiz] =
    useState(null);

  const { id } = useParams();

  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B1120] p-3 text-white sm:p-4">
      <div className="grid w-full min-w-0 gap-4 xl:grid-cols-12">
        {/* CHAT */}
        <div className="h-[750px] min-w-0 xl:col-span-3">
          <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
              <div className="rounded-xl bg-purple-500/20 p-3 text-purple-400 shrink-0">
                <FaComments />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold">
                  Live Chat
                </h2>

                <p className="truncate text-sm text-gray-400">
                  Collaborate instantly
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="min-w-0 flex-1 overflow-hidden">
              <ChatBox
                groupId={id}
                currentUser={user?.name}
              />
            </div>
          </div>
        </div>

        {/* WHITEBOARD */}
        <div className="h-[750px] min-w-0 xl:col-span-5">
          <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
              <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400 shrink-0">
                <FaPaintBrush />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold">
                  Collaborative Whiteboard
                </h2>

                <p className="truncate text-sm text-gray-400">
                  Draw and brainstorm together
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="min-w-0 flex-1 overflow-hidden">
              <Whiteboard groupId={id} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="min-w-0 w-full space-y-4 overflow-hidden xl:col-span-4">
          {/* RESOURCES */}
          <div className="min-w-0 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl sm:p-5">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-pink-500/20 p-3 text-pink-400 shrink-0">
                <FaFolderOpen />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold">
                  Shared Resources
                </h2>

                <p className="truncate text-sm text-gray-400">
                  PDFs, notes & files
                </p>
              </div>
            </div>

            {/* Upload */}
            <div className="min-w-0 overflow-hidden">
              <ResourceUpload groupId={id} />
            </div>

            {/* Resource List */}
            <div className="mt-6 max-h-[350px] min-w-0 overflow-y-auto overflow-x-hidden pr-1">
              <ResourceList groupId={id} />
            </div>
          </div>

          {/* QUIZ */}
          <div className="min-w-0 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl sm:p-5">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-500/20 p-3 text-green-400 shrink-0">
                <FaBrain />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold">
                  Quiz Zone
                </h2>

                <p className="truncate text-sm text-gray-400">
                  Practice with your team
                </p>
              </div>
            </div>

            {/* Quiz Form */}
            <div className="min-w-0 overflow-hidden">
              <QuizForm groupId={id} />
            </div>

            {/* Quiz List */}
            <div className="mt-6 min-w-0 overflow-hidden">
              <QuizList
                groupId={id}
                onPlay={setSelectedQuiz}
              />
            </div>

            {/* Selected Quiz */}
            {selectedQuiz && (
              <div className="mt-8 min-w-0 space-y-6 overflow-hidden">
                <QuizPlayer quiz={selectedQuiz} />

                <Leaderboard
                  quizId={selectedQuiz._id}
                />
              </div>
            )}
          </div>

          {/* VIDEO ROOM */}
          <div className="min-w-0 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 shadow-xl backdrop-blur-xl sm:p-5">
            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-red-500/20 p-3 text-red-400 shrink-0">
                <FaVideo />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold">
                  Live Video Room
                </h2>

                <p className="truncate text-sm text-gray-400">
                  Study face-to-face
                </p>
              </div>
            </div>

            {/* Video */}
            <div className="min-w-0 overflow-hidden">
              <VideoRoom roomId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRoom;
