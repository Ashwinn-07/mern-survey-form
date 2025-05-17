import mongoose, { Document, Model, Schema, ObjectId } from "mongoose";

export interface ISurvey extends Document {
  _id: ObjectId;
  name: string;
  gender: "male" | "female" | "other";
  nationality: string;
  email: string;
  phone: string;
  address?: string;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const surveySchema: Schema<ISurvey> = new Schema(
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

const Survey: Model<ISurvey> = mongoose.model<ISurvey>("Survey", surveySchema);
export default Survey;
