

import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getTutors, updateTutorProfile } from '../controllers/user.controller.js'

const router = express.Router()

router.get("/tutors",protect,getTutors)
router.patch("/tutor-profile",protect,updateTutorProfile)

export default router;