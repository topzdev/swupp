const express = require("express");
const router = express.Router();
const photoController = require("./controller");

router.post("/test", photoController.testUpload);

module.exports = router;
