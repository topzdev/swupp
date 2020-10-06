import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    ownerId: String,
    postId: String,
  },
  { timestamps: true }
);

export default model("Chat", chatSchema);
