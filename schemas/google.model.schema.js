import mongoose from "mongoose";

const googleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  image: String,
  googleId: String,
});

export const googleModel =
  mongoose.models.GoogleUsers || mongoose.model("GoogleUsers", googleSchema);
