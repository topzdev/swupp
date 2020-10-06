import express from "express";

const main = async () => {
  const app = express();
  const PORT = 5000 || process.env.PORT;

  app.use("/", (req, res) => {
    res.send("Hello, World");
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

main();
