import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    recoveryEmail: String,
    password: String,
    phoneNumber: String,
    isActive: Boolean,
    isReported: Boolean,
  },
  { timestamps: true }
);

export default model("User", userSchema);
