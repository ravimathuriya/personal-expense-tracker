import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};

export default uploadOnCloudinary;
