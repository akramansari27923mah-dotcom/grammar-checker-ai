import mongoose from "mongoose";

const rewritingSchema = new mongoose.Schema({
  rewrite: {
    type: Object,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const rewriteModel =
  mongoose.models.sentenceWrite ||
  mongoose.model("sentenceWrite", rewritingSchema);
