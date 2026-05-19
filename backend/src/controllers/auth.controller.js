import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "user created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions);

    return res.json({
      message: "user logged in successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};
