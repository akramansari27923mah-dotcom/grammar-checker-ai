import mongoose from "mongoose";

const stayUpdateSchema = new mongoose.Schema({
  stayUpdate: {
    type: String,
    required: true,
    unique: true,
  },
});

const stayUpdateModel =
  mongoose?.models?.stayUpdate || mongoose?.model("stayUpdate", stayUpdateSchema);

export default stayUpdateModel;
