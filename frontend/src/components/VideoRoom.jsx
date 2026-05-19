import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import socket from "../services/socket";

import {
  FaVideo,
  FaPhoneSlash,
  FaUserFriends,
  FaMicrophone,
  FaShieldAlt,
  FaCircle,
} from "react-icons/fa";

const peerOptions = {
  host:
    import.meta.env.VITE_PEER_HOST ||
    window.location.hostname,

  port: Number(
    import.meta.env.VITE_PEER_PORT ||
      5000
  ),

  path: "/peerjs",
};

const VideoRoom = ({ roomId }) => {
  const myVideo = useRef(null);

  const localStreamRef = useRef(null);

  const peerRef = useRef(null);

  const callsRef = useRef(new Map());

  const [callStarted, setCallStarted] =
    useState(false);

  const [remoteStreams, setRemoteStreams] =
    useState([]);

  const [error, setError] = useState("");

  const [status, setStatus] =
    useState("Ready to join");

  useEffect(() => {
    if (!roomId || !callStarted)
      return;

    let mounted = true;

    setError("");

    setStatus("Starting camera...");

    const addRemoteStream = (
      peerId,
      stream
    ) => {
      setRemoteStreams((prev) => {
        if (
          prev.some(
            (item) =>
              item.peerId === peerId
          )
        ) {
          return prev;
        }

        return [
          ...prev,
          { peerId, stream },
        ];
      });
    };

    const removeRemoteStream = (
      peerId
    ) => {
      setRemoteStreams((prev) =>
        prev.filter(
          (item) =>
            item.peerId !== peerId
        )
      );
    };

    const callPeer = (peerId) => {
      if (
        !peerRef.current ||
        !localStreamRef.current ||
        callsRef.current.has(peerId)
      ) {
        return;
      }

      const call =
        peerRef.current.call(
          peerId,
          localStreamRef.current
        );

      callsRef.current.set(
        peerId,
        call
      );

      call.on("stream", (stream) => {
        addRemoteStream(
          peerId,
          stream
        );
      });

      call.on("close", () => {
        callsRef.current.delete(
          peerId
        );

        removeRemoteStream(peerId);
      });

      call.on("error", () => {
        callsRef.current.delete(
          peerId
        );

        removeRemoteStream(peerId);
      });
    };

    const handleExistingUsers = (
      peerIds
    ) => {
      peerIds.forEach(callPeer);
    };

    const handleUserConnected = (
      peerId
    ) => {
      callPeer(peerId);
    };

    const handleUserDisconnected = (
      peerId
    ) => {
      callsRef.current
        .get(peerId)
        ?.close();

      callsRef.current.delete(
        peerId
      );

      removeRemoteStream(peerId);
    };

    socket.on(
      "video_room_users",
      handleExistingUsers
    );

    socket.on(
      "user_connected",
      handleUserConnected
    );

    socket.on(
      "user_disconnected",
      handleUserDisconnected
    );

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (!mounted) {
          stream
            .getTracks()
            .forEach((track) =>
              track.stop()
            );

          return;
        }

        localStreamRef.current =
          stream;

        if (myVideo.current) {
          myVideo.current.srcObject =
            stream;
        }

        const peer = new Peer(
          undefined,
          peerOptions
        );

        peerRef.current = peer;

        peer.on(
          "open",
          (peerId) => {
            setStatus(
              "Connected to room"
            );

            socket.emit(
              "join_video_room",
              {
                roomId,
                peerId,
              }
            );
          }
        );

        peer.on("call", (call) => {
          callsRef.current.set(
            call.peer,
            call
          );

          call.answer(stream);

          call.on(
            "stream",
            (remoteStream) => {
              addRemoteStream(
                call.peer,
                remoteStream
              );
            }
          );

          call.on("close", () => {
            callsRef.current.delete(
              call.peer
            );

            removeRemoteStream(
              call.peer
            );
          });

          call.on("error", () => {
            callsRef.current.delete(
              call.peer
            );

            removeRemoteStream(
              call.peer
            );
          });
        });

        peer.on("error", () => {
          setError(
            "Could not connect to the video server."
          );

          setStatus(
            "Connection failed"
          );
        });
      })
      .catch(() => {
        setError(
          "Camera or microphone permission denied."
        );

        setStatus("Camera blocked");
      });

    return () => {
      mounted = false;

      socket.emit(
        "leave_video_room"
      );

      socket.off(
        "video_room_users",
        handleExistingUsers
      );

      socket.off(
        "user_connected",
        handleUserConnected
      );

      socket.off(
        "user_disconnected",
        handleUserDisconnected
      );

      callsRef.current.forEach(
        (call) => call.close()
      );

      callsRef.current.clear();

      localStreamRef.current
        ?.getTracks()
        .forEach((track) =>
          track.stop()
        );

      localStreamRef.current = null;

      peerRef.current?.destroy();

      peerRef.current = null;

      setRemoteStreams([]);

      setStatus("Ready to join");
    };
  }, [roomId, callStarted]);

  const leaveCall = () => {
    setCallStarted(false);
  };

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-linear-to-b from-gray-950 to-black p-5 shadow-2xl">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-500/20 p-4 text-blue-400">
            <FaVideo className="text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Video Room
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Live group collaboration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
          <FaCircle className="text-[10px]" />

          {remoteStreams.length + 1} Active
        </div>
      </div>

      {/* Status */}
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
        <FaShieldAlt className="text-blue-400" />

        {status}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Controls */}
      {!callStarted ? (
        <button
          onClick={() =>
            setCallStarted(true)
          }
          className="mb-5 flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 py-4 font-semibold text-white transition hover:scale-[1.01]"
        >
          <FaVideo />

          Join Video Call
        </button>
      ) : (
        <button
          onClick={leaveCall}
          className="mb-5 flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-red-500 to-pink-500 py-4 font-semibold text-white transition hover:scale-[1.01]"
        >
          <FaPhoneSlash />

          Leave Call
        </button>
      )}

      {/* Video Grid */}
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
        {/* My Video */}
        {callStarted && (
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black">
            <video
              ref={myVideo}
              autoPlay
              muted
              playsInline
              className="h-full w-full rounded-3xl object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/80 to-transparent p-4">
              <div>
                <h3 className="font-semibold text-white">
                  You
                </h3>

                <p className="text-xs text-gray-300">
                  Local Stream
                </p>
              </div>

              <div className="flex gap-2">
                <div className="rounded-full bg-green-500/20 p-2 text-green-400">
                  <FaMicrophone />
                </div>

                <div className="rounded-full bg-blue-500/20 p-2 text-blue-400">
                  <FaVideo />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remote Videos */}
        {remoteStreams.map(
          ({ peerId, stream }) => (
            <VideoPlayer
              key={peerId}
              stream={stream}
              peerId={peerId}
            />
          )
        )}
      </div>

      {/* Empty State */}
      {callStarted &&
        remoteStreams.length === 0 && (
          <div className="mt-5 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 py-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
              <FaUserFriends className="text-3xl text-blue-400" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              Waiting for participants
            </h3>

            <p className="mt-2 max-w-xs text-sm text-gray-400">
              Share the study room with your
              teammates and collaborate
              together in real time.
            </p>
          </div>
        )}
    </div>
  );
};

const VideoPlayer = ({
  stream,
  peerId,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black">
      <video
        ref={ref}
        autoPlay
        playsInline
        className="h-full w-full rounded-3xl object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/80 to-transparent p-4">
        <div>
          <h3 className="font-semibold text-white">
            Participant
          </h3>

          <p className="max-w-30 truncate text-xs text-gray-300">
            {peerId}
          </p>
        </div>

        <div className="rounded-full bg-green-500/20 p-2 text-green-400">
          <FaMicrophone />
        </div>
      </div>
    </div>
  );
};

export default VideoRoom;