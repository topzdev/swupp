import { Schema, model } from "mongoose";

const userReviewSchema = new Schema(
  {
    star: Number,
    userId: String,
    criticId: String,
    title: String,
    content: String,
  },
  { timestamps: true }
);

export default model("UserReview", userReviewSchema);
