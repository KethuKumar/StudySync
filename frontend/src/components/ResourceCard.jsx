import {
  FaFilePdf,
  FaImage,
  FaDownload,
  FaExternalLinkAlt,
  FaFileAlt,
} from "react-icons/fa";

const ResourceCard = ({
  resource,
}) => {
  const isImage =
    resource.fileType?.startsWith(
      "image"
    );

  const isPdf =
    resource.fileType?.includes(
      "pdf"
    );

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br from-[#111827] to-[#0F172A] p-5 shadow-2xl transition duration-300 hover:border-pink-500/30">
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative flex items-center gap-4">
        {/* FILE ICON */}
        <div
          className={`flex h-18 w-18 items-center justify-center rounded-3xl text-3xl ${
            isImage
              ? "bg-pink-500/15 text-pink-400"
              : isPdf
              ? "bg-red-500/15 text-red-400"
              : "bg-blue-500/15 text-blue-400"
          }`}
        >
          {isImage ? (
            <FaImage />
          ) : isPdf ? (
            <FaFilePdf />
          ) : (
            <FaFileAlt />
          )}
        </div>

        {/* INFO */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-white">
            {resource.fileName}
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Uploaded by{" "}
            <span className="font-medium text-pink-300">
              {
                resource
                  .uploadedBy
                  ?.name
              }
            </span>
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                isImage
                  ? "bg-pink-500/10 text-pink-300"
                  : isPdf
                  ? "bg-red-500/10 text-red-300"
                  : "bg-blue-500/10 text-blue-300"
              }`}
            >
              {isImage
                ? "Image"
                : isPdf
                ? "PDF"
                : "File"}
            </span>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="relative mt-5 flex gap-3">
        <a
          href={resource.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
        >
          <FaExternalLinkAlt />

          Open
        </a>

        <a
          href={resource.url}
          download
          className="flex items-center justify-center rounded-2xl bg-pink-500/15 px-5 py-3 text-pink-300 transition hover:bg-pink-500/25"
        >
          <FaDownload />
        </a>
      </div>
    </div>
  );
};

export default ResourceCard;