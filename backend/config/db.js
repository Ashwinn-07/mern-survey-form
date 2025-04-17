import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongoDB connected");
  } catch (err) {
    console.log("error while connecting to the database", err);
    throw err;
  }
}
