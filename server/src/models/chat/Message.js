import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    chatId: String,
    userId: String,
    message: Number,
    isDeleted: Boolean,
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
