import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import userAuthentication from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter
  .route("/registeruser")
  .post(upload.fields([{ name: "profilePic", maxCount: 1 }]), registerUser);

  userRouter.route("/loginuser").post(loginUser)

  userRouter.route("/logout").post(userAuthentication, logOutUser)

export default userRouter;
