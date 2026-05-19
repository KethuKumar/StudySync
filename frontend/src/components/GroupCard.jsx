import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaArrowRight,
  FaCopy,
  FaLayerGroup,
} from "react-icons/fa";

const GroupCard = ({ group }) => {
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(
      group.inviteCode
    );
  };

  return (
    <div className="group relative overflow-hidden rounded-[4xl] border border-white/10 bg-linear-to-br from-[#111827] to-[#0F172A] p-6 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      {/* TOP */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-3xl bg-blue-500/15 p-4 text-blue-400">
            <FaLayerGroup className="text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {group.name}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Collaborative study group
            </p>
          </div>
        </div>

        <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
          Active
        </div>
      </div>

      {/* INVITE CODE */}
      <div className="relative mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-400">
            Invite Code
          </p>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaCopy />

            Copy
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4 font-mono text-lg tracking-widest text-blue-300">
          {group.inviteCode}
        </div>
      </div>

      {/* MEMBERS */}
      <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
        <div className="rounded-xl bg-purple-500/15 p-3 text-purple-400">
          <FaUsers />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Members
          </p>

          <h3 className="text-xl font-bold text-white">
            {group.members?.length}
          </h3>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          navigate(
            `/group/${group._id}`
          )
        }
        className="relative mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 px-5 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:from-blue-400 hover:to-cyan-400"
      >
        Enter Study Room

        <FaArrowRight />
      </button>
    </div>
  );
};

export default GroupCard;