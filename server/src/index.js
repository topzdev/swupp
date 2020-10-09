const express = require("express");
const sequelize = require("./config/sequelize");
const Post = require("./models/post/Post");
const User = require("./models/user/User");
const apis = require("./apis");
const bodyParser = require("body-parser");
const cors = require("cors");
const Profile = require("./models/user/Profile");

const main = async () => {
  try {
    await sequelize.authenticate();
    await Post.sync();
    await User.sync();
    await Profile.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const app = express();
  const PORT = 5000 || process.env.PORT;

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/v1", apis);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

main();
