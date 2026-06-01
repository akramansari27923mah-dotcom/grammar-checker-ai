import mongoose from "mongoose";

const groqSchema = new mongoose.Schema(
  {
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

export const groqModel = mongoose.models.Chats || mongoose.model("Chats", groqSchema);
