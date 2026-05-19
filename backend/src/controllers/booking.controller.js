import bookingModel from "../models/booking.model.js";

// create booking
export const createBooking = async (req, res) => {
  try {
    const { tutorId, startTime, endTime } = req.body;

    // check conflict
    const conflict = await bookingModel.findOne({
      tutor: tutorId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    });

    if (conflict) {
      return res.status(400).json({
        message: "slot already booked",
      });
    }

    const booking = await bookingModel.create({
      tutor: tutorId,
      student: req.user,
      startTime,
      endTime,
    });

    return res.status(201).json({
      message: "book successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

// get my bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({
        $or: [{ tutor: req.user }, { student: req.user }],
      })
      .populate("tutor", "name")
      .populate("student", "name");

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
