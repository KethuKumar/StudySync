import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../features/group/groupSlice";

const CreateGroupModal = ({ closeModal }) => {

  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createGroup({ name }));

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Create Group
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            Create
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateGroupModal;