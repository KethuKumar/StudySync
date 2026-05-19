import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "not authorized",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded.id;

    // console.log("next", typeof next)

    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};
