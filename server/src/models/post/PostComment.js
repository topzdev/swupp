import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    userId: String,
    postId: String,
    content: String,
  },
  { timestamps: true }
);

export default model("PostComment", commentSchema);
