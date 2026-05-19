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
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#0B1120] p-4 text-white">
      <div className="grid gap-4 xl:grid-cols-12">
        {/* CHAT */}
        <div className="xl:col-span-3">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <div className="rounded-xl bg-purple-500/20 p-3 text-purple-400">
                <FaComments />
              </div>

              <div>
                <h2 className="font-bold">Live Chat</h2>

                <p className="text-sm text-gray-400">
                  Collaborate instantly
                </p>
              </div>
            </div>

            <div className="h-185">
              <ChatBox
                groupId={id}
                currentUser={user?.name}
              />
            </div>
          </div>
        </div>

        {/* WHITEBOARD */}
        <div className="xl:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400">
                <FaPaintBrush />
              </div>

              <div>
                <h2 className="font-bold">
                  Collaborative Whiteboard
                </h2>

                <p className="text-sm text-gray-400">
                  Draw and brainstorm together
                </p>
              </div>
            </div>

            <div className="h-185.5">
              <Whiteboard groupId={id} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4 xl:col-span-4">
          {/* RESOURCES */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-pink-500/20 p-3 text-pink-400">
                <FaFolderOpen />
              </div>

              <div>
                <h2 className="font-bold">
                  Shared Resources
                </h2>

                <p className="text-sm text-gray-400">
                  PDFs, notes & files
                </p>
              </div>
            </div>

            <ResourceUpload groupId={id} />

            <div className="mt-6 max-h-75 overflow-y-auto pr-2">
              <ResourceList groupId={id} />
            </div>
          </div>

          {/* QUIZZES */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-green-500/20 p-3 text-green-400">
                <FaBrain />
              </div>

              <div>
                <h2 className="font-bold">
                  Quiz Zone
                </h2>

                <p className="text-sm text-gray-400">
                  Practice with your team
                </p>
              </div>
            </div>

            <QuizForm groupId={id} />

            <div className="mt-6">
              <QuizList
                groupId={id}
                onPlay={setSelectedQuiz}
              />
            </div>

            {selectedQuiz && (
              <div className="mt-8 space-y-6">
                <QuizPlayer quiz={selectedQuiz} />

                <Leaderboard quizId={selectedQuiz._id} />
              </div>
            )}
          </div>

          {/* VIDEO ROOM */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-xl backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-red-500/20 p-3 text-red-400">
                <FaVideo />
              </div>

              <div>
                <h2 className="font-bold">
                  Live Video Room
                </h2>

                <p className="text-sm text-gray-400">
                  Study face-to-face
                </p>
              </div>
            </div>

            <VideoRoom roomId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRoom;