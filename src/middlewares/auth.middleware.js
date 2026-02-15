import ApiError from "../utils/api-error.js";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJwt = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers["Authorization"].replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized user");
  }

  try {
    const decodedUser = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );
    const user = await User.findById(decodedUser._id).select(
      "-password  -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry",
    );

    if (!user) {
      throw new ApiError("Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError("Invalid Access Token");
  }
};

export default verifyJwt;
