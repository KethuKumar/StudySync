

import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { createBooking, getMyBookings } from '../controllers/booking.controller.js'

const router = express.Router()

router.post("/", protect, createBooking)
router.get("/", protect, getMyBookings)

export default router