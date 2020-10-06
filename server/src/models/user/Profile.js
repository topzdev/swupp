import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    userId: String, // shoud be is from User model will change it after i study the relaitionship in mongodb
    firstname: String,
    lastname: String,
    username: String,
    profilePhotoId: String,
    coverPhotoId: String,
    birthdate: String,
    twitterUrl: String,
    fbUrl: String,
    instaUrl: String,
    websiteUrl: String,
  },
  { timestamps: true }
);

export default model("Profile", profileSchema);
