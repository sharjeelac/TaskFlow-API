import ApiError from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import asyncHandler from "../utils/async-handler.js";
import { ProjectMember } from "../models/projectMember.model.js";

const verifyJwt = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized user");
  }

  try {
    const decodedUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );
    const user = await User.findById(decodedUser._id).select(
      "-password  -forgotPasswordToken -forgotPasswordExpiry -emailVerificationToken -emailVerificationExpiry",
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    // jwt.verify throws on invalid/expired token
    throw new ApiError(401, "Invalid Access Token");
  }
};

const validateProjectPermission = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    if (!projectId) {
      throw new ApiError(400, "Project id is missing");
    }

    const project = await ProjectMember.findOne({
      project: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(req.user._id),
    });

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const givenRole = project.role;
    if (!roles.includes(givenRole)) {
      throw new ApiError(
        403,
        "You do not have permission to perform this action",
      );
    }

    next();
  });

export { verifyJwt, validateProjectPermission };
