import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    isTutor: {
      type: Boolean,
      default: false,
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      default: "",
    },

    skills: [String],
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
