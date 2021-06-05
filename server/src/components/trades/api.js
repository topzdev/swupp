const express = require("express");
const router = express.Router();
const tradeController = require("./controller");
const { auth } = require("../../middleware/index");
router.post("/create", auth, tradeController.createTrade);
router.post("/my-trades", auth, tradeController.getCurrentUserTrades);
router.get("/getTradeById/:tradeId", tradeController.getTradeById);
router.post("/add-message", auth, tradeController.addMessage);
router.post("/messages", tradeController.getTradeMessages);
router.post("/acceptTrade", auth, tradeController.acceptTrade);
router.get("/isTraded/:id", tradeController.isTraded);
router.post("/isTradeExist", tradeController.isTradeExist);

module.exports = router;
