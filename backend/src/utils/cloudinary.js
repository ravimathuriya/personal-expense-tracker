import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // (you had a typo here: "API_SCRET")
});

const uploadOnCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return null;
  }
};

export default uploadOnCloudinary;
