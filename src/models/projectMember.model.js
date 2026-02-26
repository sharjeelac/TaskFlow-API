import mongoose, { Schema } from "mongoose";
import { AvailableUserRoles, UserRolesEnums } from "../utils/constants.js";

const projectMemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnums.MEMBER,
    },
  },
  { timestamps: true },
);

// Ensures a user can only have ONE role per project
projectMemberSchema.index({ user: 1, project: 1 }, { unique: true });

// Speeds up the exact query we wrote earlier
projectMemberSchema.index({ user: 1 });
projectMemberSchema.index({ project: 1 });

export const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberSchema,
);
