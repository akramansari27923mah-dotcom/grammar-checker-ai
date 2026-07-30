import mongoose from "mongoose";

const explainGrammerSchema = new mongoose.Schema(
  {
    mistakes: {
      type: Object,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const explainGrammerModel =
  mongoose?.models?.GrammerMistakes ||
  mongoose?.model("GrammerMistakes", explainGrammerSchema);
