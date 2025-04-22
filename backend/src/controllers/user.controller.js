import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  const existUser = await User.findById(userId);

  const refreshToken = await existUser.generateRefreshToken();
  const accessToken = await existUser.generateAccessToken();

  existUser.refreshToken = refreshToken;
  existUser.accessToken = accessToken;
  existUser.save({ validateBeforeSave: true });

  return { refreshToken, accessToken };
};

const registerUser = asyncHandler(async (req, res) => {
  //Get the data from req.body
  const { fullName, email, password } = req.body;

  //check if any filed is empty or not available
  if (!(fullName && email && password)) {
    res.status(500).json({
      message: "All fields are required.",
    });
  }

  //check the user if already registered by the email
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    res.status(400).json({
      message: "User already registered",
    });
  } 
  //check the profilePic path from req.files
  const profilePicPath = await req.files?.profilePic[0]?.path;
  
  if (!profilePicPath) {
    res.status(400).json({
        message: "Profile pic required to upload",
      });
    }
    
    //uplaod the file on cloudinary
    const uploadProfileImage = await uploadOnCloudinary(profilePicPath);
    
    if (!uploadProfileImage) {
      res.status(500).json({
        message: "Issue while uploading the image on cloudinary",
      });
    }

    else {

    //user creation on mongoDB
    const createUser = await User.create({
      fullName: fullName,
      email: email,
      password: password,
      profilePic: uploadProfileImage.url,
    });

    if (!createUser) {
      res.status(400).json({
        message: "Something went wrong while user creation",
      });
    }

    return res.status(200).json({
      message: "User registered successfully",
      createUser,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //get the data from req.body
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(500).json({
      message: "all fields are required",
    });
  }

  //find the user in database
  const findUser = await User.findOne({ email });

  if (!findUser) {
    res.status(500).json({
      message: "user not registered",
    });
  }

  //check the password its correct or not
  const comparePassword = await findUser.comparePassword(password);

  if (!comparePassword) {
    res.status(500).json({
      message: "Please check the password",
    });
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    findUser._id
  );

  const loggedUser = await User.findById(findUser._id).select(
    "-password -accessToken -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User loggedin successfully",
      loggedUser,
      refreshToken,
      accessToken,
    });
});

const logOutUser = asyncHandler(async (req, res) => {
  const loggedUser = req.user;
  const existedUser = await User.findById(loggedUser._id);

  if (!existedUser) {
    res.status(400).json({
      message: "You are not authorized",
    });
  }

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out successfully",
    });
});

export { registerUser, loginUser, logOutUser };
