import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
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

export const savedModel =
  mongoose.models.Saved || mongoose.model("Saved", savedSchema);
