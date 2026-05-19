import groupModel from "../models/group.model.js";

// create group
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    const group = new groupModel({
      name,
      owner: req.user,
      members: [req.user],
    });

    await group.save();

    return res.status(201).json({
      message: "group is created successfully",
      group,
    });
  } catch (error) {
    // console.log("FULL ERROR:", error);

    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

// join group via invite code
export const joinGroup = async (req, res) => {
  try {
    const { inviteCode } = req.params;

    const group = await groupModel.findOne({
      inviteCode,
    });

    if (!group) {
      return res.status(404).json({
        message: "group not found",
      });
    }

    // prevent duplicate join

    if (group.members.includes(req.user)) {
      return res.status(400).json({
        message: "Already a member",
      });
    }

    group.members.push(req.user);
    await group.save();

    return res.status(200).json({
      message: "group joined successfully",
      group,
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

// get user groups
export const getMyGroups = async (req, res) => {
  try {
    const groups = await groupModel
      .find({
        members: req.user,
      })
      .populate("owner", "name email");

    return res.status(200).json({
      message: "get user groups",
      groups,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get single group details
export const getGroupById = async (req, res) => {
  try {
    const group = await groupModel
      .findById(req.params.id)
      .populate("members", "name email");

    if (!group) {
      return res.status(404).json({
        message: "group not found",
      });
    }

    // security check
    if (!group.members.some((m) => m._id.toString() === req.user)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    return res.status(200).json({
      group,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
