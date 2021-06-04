const express = require("express");
const router = express.Router();
const tradeController = require("./controller");
const { auth } = require("../../middleware/index");
router.post("/create", tradeController.createTrade);
router.post("/my-trades", tradeController.getCurrentUserTrades);
router.get("/getTradeById/:tradeId", tradeController.getTradeById);
router.post("/add-message", tradeController.addMessage);
router.post("/messages", tradeController.getTradeMessages);

module.exports = router;
