import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  fileName: String,

  url: String,

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },

},{
    timestamps:true
});

const resourceModel = mongoose.model("Resource", resourceSchema)

export default resourceModel
