import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
      lowercase: true,
    },
    nationality: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Survey", surveySchema);
