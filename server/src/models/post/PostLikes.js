import { Schema, model } from "mongoose";

const likesShema = new Schema(
  {
    userId: String,
    postId: String,
  },
  { timestamps: true }
);

export default model("PostLikes", likesShema);
