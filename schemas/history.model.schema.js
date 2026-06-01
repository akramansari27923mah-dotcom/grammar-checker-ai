import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
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

export const historyModel = mongoose.models.History || mongoose.model("History", historySchema);
