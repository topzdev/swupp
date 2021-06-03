const express = require("express");
const router = express.Router();
const tradeController = require("./controller");

router.post("/create", tradeController.createTrade);
router.post("/my-trades", tradeController.getCurrentUserTrades);
router.post("/add-message", tradeController.addMessage);
router.post("/messages", tradeController.getTradeMessages);

module.exports = router;
