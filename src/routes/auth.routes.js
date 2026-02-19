import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  verifyEmail,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgotPassword,
  getCurrentUser,
  resendEmailVerification,
} from "../controllers/auth.controller.js";
import {
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  userResetForgotPasswordValidator,
  userCurrentPasswordChangeValidator,
} from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

// unsecure routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/forgot-password")
  .post(forgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route("/reset-password/:forgotPasswordToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

// secure routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router
  .route("/change-password")
  .post(
    userCurrentPasswordChangeValidator(),
    validate,
    verifyJwt,
    getCurrentUser,
  );
router
  .route("/resend-email-verification")
  .post(verifyJwt, resendEmailVerification);
export default router;
