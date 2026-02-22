import mongoose, { Schema } from "mongoose";

const subTask = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const SubTask = mongoose.model("SubTask", subTask);
