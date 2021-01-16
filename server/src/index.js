const express = require("express");
const sequelize = require("./config/sequelize");
const apis = require("./apis");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const Redis = require("ioredis");
const connectRedis = require("connect-redis");
const { COOKIE_NAME, SESSION_SECRET, __prod__ } = require("./constants");
const models = require("./models");
const fileUpload = require("express-fileupload");

// globally import cloudinary
require("./config/cloudinary");

const main = async () => {
  console.log(process.env.DB_PASSWORD);
  try {
    await sequelize.authenticate();
    await models();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  const PORT = 5000 || process.env.PORT;

  app.use(cors());
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      secret: SESSION_SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },

      saveUninitialized: false,
      resave: false,
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

  app.use("/api/v1", apis);
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

main();
