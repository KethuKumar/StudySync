import { useState } from "react";
import { useDispatch } from "react-redux";

import { uploadResource } from "../features/resource/resourceSlice";

import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

const ResourceUpload = ({ groupId }) => {
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    await dispatch(
      uploadResource({
        file,
        groupId,
      })
    );

    setFile(null);

    setLoading(false);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-500/20 p-3 text-blue-400">
          <FaCloudUploadAlt />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Upload Resource
          </h2>

          <p className="text-sm text-gray-400">
            Share PDFs, notes, images & study material
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 bg-black/20 px-6 py-10 text-center transition hover:border-blue-500/40 hover:bg-blue-500/5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-3xl text-blue-400 transition group-hover:scale-110">
          <FaCloudUploadAlt />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-white">
          Click to upload file
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          Drag & drop or browse from your computer
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      {/* Selected File */}
      {file && (
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-500/20 p-3 text-green-400">
              <FaFileAlt />
            </div>

            <div>
              <h4 className="max-w-45 truncate font-medium text-white">
                {file.name}
              </h4>

              <p className="text-sm text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <FaCheckCircle className="text-green-400" />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-500 to-purple-500 py-4 font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaCloudUploadAlt />

        {loading ? "Uploading..." : "Upload Resource"}
      </button>
    </div>
  );
};

export default ResourceUpload;