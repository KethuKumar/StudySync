import mongoose from "mongoose";
import crypto from 'crypto'

const groupSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  inviteCode:{
    type:String,
    unique:true
  }
}, {timestamps:true});

groupSchema.pre("save", async function () {
  if (!this.inviteCode) {
    this.inviteCode = crypto.randomBytes(6).toString("hex");
  }
});

const groupModel = mongoose.model("Group", groupSchema)

export default groupModel