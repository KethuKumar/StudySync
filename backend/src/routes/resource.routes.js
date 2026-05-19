

import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { getGroupResources, uploadResource } from "../controllers/resource.controller.js";

const router = express.Router()

router.post("/", protect, upload.single("file"), uploadResource)
router.get("/:groupId", protect, getGroupResources)

export default router;