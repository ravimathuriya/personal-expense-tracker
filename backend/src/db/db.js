import mongoose from "mongoose";
import dbName from "../constant.js";
import "dotenv/config";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.mongoURI}/${dbName}`
    );
    console.log("mongoose connected successfully");
  } catch (error) {
    console.log("mongoose connection failed", error);
  }
};

export default connectDB;
