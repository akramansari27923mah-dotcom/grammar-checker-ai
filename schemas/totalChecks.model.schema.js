import mongoose from "mongoose";

const totalChecksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    replyFromAi: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const totalChecksModel =
  mongoose.models.TotalChecks ||
  mongoose.model("TotalChecks", totalChecksSchema);
