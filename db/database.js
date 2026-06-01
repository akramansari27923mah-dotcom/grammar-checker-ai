import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("mongoUri is messing");
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
