import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../features/group/groupSlice";

import {
  FaUsers,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

const CreateGroupModal = ({ closeModal }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    await dispatch(
      createGroup({
        name,
      })
    );

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-[#111827] shadow-2xl">
        {/* Background Glow */}
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10">
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-white/10 px-7 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-2xl text-blue-400">
                <FaUsers />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Create Study Group
                </h2>

                <p className="text-sm text-gray-400">
                  Start collaborating with your team
                </p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* BODY */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 px-7 py-7"
          >
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-300">
                Group Name
              </label>

              <input
                type="text"
                placeholder="e.g. DSA Masters, React Ninjas..."
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500/50 focus:bg-white/10"
              />
            </div>

            {/* INFO BOX */}
            <div className="rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">
              <p className="text-sm leading-relaxed text-blue-200">
                After creating the group, an invite code
                will be generated automatically so you can
                invite your friends instantly.
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
              >
                <FaPlus />

                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
