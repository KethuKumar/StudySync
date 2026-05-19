import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createGroup,
  getGroupById,
  getMyGroups,
  joinGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

// console.log("createGroup type:", typeof createGroup);
router.post("/", protect, createGroup);
router.post("/join/:inviteCode", protect, joinGroup);
router.get("/", protect, getMyGroups);
router.get("/:id", protect, getGroupById);

export default router;
