import mongoose, { Document, Model, Schema, ObjectId } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  _id: ObjectId;
  username: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const adminSchema: Schema<IAdmin> = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

adminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.matchPassword = async function (
  this: IAdmin,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
