import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: String,
    title: String,
    price: Number,
    categoryId: String,
    qualityId: String,
    conditionId: String,
    description: String,
    prefered: String,
  },
  { timestamps: true }
);

export default model("Post", postSchema);
