import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import "dotenv/config";

const userAuthentication = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.cookies.accessToken ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.replace("Bearer ", "")
        : null)

    if (!token) {
      res.status(400).json({
        message: "You are not authorized",
      });
      
    }

    const verifyToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const existUser = await User.findById(verifyToken._id).select(
      "-password -refreshToken -accessToken"
    );

    if (!existUser) {
      res.status(400).json({
        message: "Invalid access Token",
      });
    }

    req.user = existUser;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Sonething went wrong while authenticate the user",
    });
    next(error);
  }
});

export default userAuthentication;
