import imagekit from "../config/imagekit.js";
import groupModel from "../models/group.model.js";
import resourceModel from "../models/resource.model.js";

export const uploadResource = async (req, res) => {
  console.log("FILE:", req.file);
  console.log("BODY:", req.body);

  try {
    const { groupId } = req.body;

    const group = await groupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    // check membership
    // if (!group.members.includes(req.user)) {
    //   return res.status(403).json({
    //     message: "not a group member",
    //   });
    // }
    const isMember = group.members.some(
      (member) => member.toString() === req.user.toString(),
    );

    if (!isMember) {
      return res.status(403).json({
        message: "not a group member",
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "no file uploaded",
      });
    }

    // upload to imagekit
    const uploaded = await imagekit.upload({
      file: file.buffer.toString("base64"),
      fileName: file.originalname,
      folder: "studysync/resources", // 🔥 clean structure
    });

    const resource = await resourceModel.create({
      fileName: file.originalname,
      url: uploaded.url,
      fileType: file.mimetype,
      uploadedBy: req.user,
      group: groupId,
    });

    return res
      .status(201)
      .json({ message: "file uploaded successfully", resource });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get group files

export const getGroupResources = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await groupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({
        message: "group not found",
      });
    }

    if (!group.members.includes(req.user)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const resources = await resourceModel
      .find({
        group: groupId,
      })
      .populate("uploadedBy", "name");

    return res.status(200).json({
      resources,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
