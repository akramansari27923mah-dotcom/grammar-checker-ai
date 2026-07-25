import mongoose, { Schema } from "mongoose";

const synonymAntonymSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    partOfSpeech: {
      type: String,
      required: true,
      trim: true,
    },

    meaning: {
      type: String,
      required: true,
      trim: true,
    },
    synonyms: {
      type: [String],
      default: [],
    },
    antonyms: {
      type: [String],
      default: [],
    },
    example: {
      type: String,
      default: "",
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export const SynonymAntonymModel =
  mongoose.models.SynonymAntonym ||
  mongoose.model("SynonymAntonym", synonymAntonymSchema);
