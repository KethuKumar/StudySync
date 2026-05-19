import { useState } from "react";

import { useDispatch }
from "react-redux";

import {
  createBooking
} from "../features/booking/bookingSlice";

import {
  FaCalendarAlt,
  FaClock,
  FaVideo,
  FaRupeeSign,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

const BookingModal = ({
  tutor,
  closeModal
}) => {

  const dispatch = useDispatch();

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const handleBooking = async () => {

    await dispatch(
      createBooking({

        tutorId: tutor._id,

        startTime,

        endTime

      })
    );

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

      {/* MODAL */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-[#111827] to-[#0F172A] shadow-2xl">

        {/* Glow */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />

        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:bg-red-500 hover:text-white"
        >
          <FaTimes />
        </button>

        {/* HEADER */}
        <div className="relative border-b border-white/10 p-7">

          <div className="flex items-center gap-5">

            <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-blue-500/15 text-3xl text-blue-400">
              <FaVideo />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-400">
                StudySync Session
              </p>

              <h2 className="mt-1 text-3xl font-black text-white">
                Book {tutor.name}
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Schedule a private study session with your tutor
              </p>
            </div>

          </div>

        </div>

        {/* BODY */}
        <div className="relative space-y-6 p-7">

          {/* PRICE */}
          <div className="rounded-3xl border border-green-500/10 bg-green-500/5 p-5">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-green-500/10 p-3 text-green-400">
                <FaRupeeSign />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Hourly Session Rate
                </p>

                <h3 className="text-3xl font-black text-white">
                  ₹{tutor.hourlyRate}
                  <span className="ml-2 text-base font-medium text-gray-400">
                    / hour
                  </span>
                </h3>
              </div>

            </div>

          </div>

          {/* START TIME */}
          <div>

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-300">
              <FaCalendarAlt className="text-blue-400" />

              Session Start
            </label>

            <div className="relative">

              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) =>
                  setStartTime(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-blue-500/40 focus:bg-white/[0.07]"
              />

            </div>

          </div>

          {/* END TIME */}
          <div>

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-300">
              <FaClock className="text-pink-400" />

              Session End
            </label>

            <div className="relative">

              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) =>
                  setEndTime(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-pink-500/40 focus:bg-white/[0.07]"
              />

            </div>

          </div>

          {/* INFO BOX */}
          <div className="flex items-start gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">

            <div className="mt-1 text-blue-400">
              <FaCheckCircle />
            </div>

            <div>
              <h4 className="font-semibold text-white">
                Live Online Session
              </h4>

              <p className="mt-1 text-sm text-gray-400">
                Your booking will reserve a dedicated tutoring slot with video collaboration support.
              </p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-2">

            <button
              onClick={closeModal}
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-4 font-semibold text-gray-300 transition hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              onClick={handleBooking}
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:from-blue-400 hover:to-cyan-400"
            >
              <FaCalendarAlt />

              Confirm Booking
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookingModal;