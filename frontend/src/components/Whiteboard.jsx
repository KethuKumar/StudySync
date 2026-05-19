import { useEffect, useRef, useState } from "react";
import socket from "../services/socket";

import {
  FaTrash,
  FaPaintBrush,
  FaEraser,
} from "react-icons/fa";

const Whiteboard = ({ groupId }) => {
  const canvasRef = useRef(null);

  const ctxRef = useRef(null);

  const [drawing, setDrawing] = useState(false);

  const [color, setColor] = useState("#ffffff");

  const [brushSize, setBrushSize] = useState(3);

  const current = useRef({
    x: 0,
    y: 0,
  });

  const colors = [
    "#ffffff",
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#ec4899",
  ];

  // setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth - 40;
      canvas.height = 650;

      const ctx = canvas.getContext("2d");

      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;

      ctxRef.current = ctx;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [color, brushSize]);

  // socket listeners
  useEffect(() => {
    socket.on("draw", (data) => {
      drawLine(
        data.x0,
        data.y0,
        data.x1,
        data.y1,
        data.color,
        data.size,
        false
      );
    });

    socket.on("clear_board", () => {
      const canvas = canvasRef.current;

      ctxRef.current.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    });

    return () => {
      socket.off("draw");
      socket.off("clear_board");
    };
  }, []);

  // draw line
  const drawLine = (
    x0,
    y0,
    x1,
    y1,
    drawColor,
    size,
    emit = true
  ) => {
    const ctx = ctxRef.current;

    ctx.beginPath();

    ctx.moveTo(x0, y0);

    ctx.lineTo(x1, y1);

    ctx.strokeStyle = drawColor;

    ctx.lineWidth = size;

    ctx.stroke();

    ctx.closePath();

    if (!emit) return;

    socket.emit("draw", {
      groupId,
      x0,
      y0,
      x1,
      y1,
      color: drawColor,
      size,
    });
  };

  // mouse down
  const handleMouseDown = (e) => {
    setDrawing(true);

    current.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  // mouse move
  const handleMouseMove = (e) => {
    if (!drawing) return;

    const x = e.nativeEvent.offsetX;

    const y = e.nativeEvent.offsetY;

    drawLine(
      current.current.x,
      current.current.y,
      x,
      y,
      color,
      brushSize
    );

    current.current = { x, y };
  };

  // mouse up
  const handleMouseUp = () => {
    setDrawing(false);
  };

  // clear board
  const clearBoard = () => {
    const canvas = canvasRef.current;

    ctxRef.current.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    socket.emit("clear_board", groupId);
  };

  return (
    <div className="flex h-full flex-col bg-[#111827]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/20 px-5 py-4 backdrop-blur-xl">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400">
            <FaPaintBrush />
          </div>

          <div>
            <h2 className="font-bold text-white">
              Collaborative Whiteboard
            </h2>

            <p className="text-sm text-gray-400">
              Draw and brainstorm together
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Colors */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`h-7 w-7 rounded-full border-2 transition ${
                  color === c
                    ? "scale-110 border-white"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
            <FaEraser className="text-gray-400" />

            <input
              type="range"
              min="1"
              max="12"
              value={brushSize}
              onChange={(e) =>
                setBrushSize(Number(e.target.value))
              }
              className="cursor-pointer"
            />

            <span className="text-sm text-gray-300">
              {brushSize}px
            </span>
          </div>

          {/* Clear */}
          <button
            onClick={clearBoard}
            className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            <FaTrash />
            Clear
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex flex-1 items-center justify-center overflow-auto bg-[#0F172A] p-5">
        <canvas
          ref={canvasRef}
          className="cursor-crosshair rounded-3xl border border-white/10 bg-[#111827] shadow-2xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default Whiteboard;