const express = require("express");
const sequelize = require("./config/sequelize");
const apis = require("./apis");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { COOKIE_NAME, SESSION_SECRET, __prod__, PORT } = require("./constants");
const models = require("./models");
const fileUpload = require("express-fileupload");
var cookieSession = require("cookie-session");

// globally import cloudinary
require("./config/cloudinary");

const main = async () => {
  try {
    await sequelize.authenticate();
    await models();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const app = express();

  app.use(cors());
  // app.use(
  //   session({
  //     name: COOKIE_NAME,
  //     secret: SESSION_SECRET,
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  //       httpOnly: true,
  //       sameSite: "lax",
  //       secure: __prod__,
  //     },

  //     saveUninitialized: false,
  //     resave: false,
  //   })
  // );
  app.use(
    cookieSession({
      name: COOKIE_NAME,
      secret: SESSION_SECRET,
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "lax",
      secure: __prod__,
    })
  );
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  app.get("/", (req, res) => {
    res.send("Welcome to SWUPP SERVER API");
  });
  app.use("/api/v1", apis);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

main();
