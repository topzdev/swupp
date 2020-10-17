import { Schema, model } from "mongoose";

const postPhotoSchema = new Schema(
  {
    postId: String,
    url: String,
    shortUrl: String,
    description: String,
    publicId: String,
  },
  { timestamps: true }
);

export default model("PostPhoto", postPhotoSchema);
