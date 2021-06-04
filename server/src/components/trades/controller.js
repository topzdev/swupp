const tradeServices = require("./servies");

exports.createTrade = async (req, res) => {
  try {
    const body = req.body;
    const params = {
      offerCreatorId: req.session.userId,
      message: body.message,
      postId: body.postId,
      offerId: body.offerId,
    };
    console.log(params);
    // const data = null;
    const data = await tradeServices.createTrade(params);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getCurrentUserTrades = async (req, res) => {
  try {
    const body = req.body;
    const params = {
      userId: req.session.userId,
    };
    const data = await tradeServices.getCurrentUserTrades(params);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.addMessage = async (req, res) => {
  try {
    const body = req.body;
    const params = {
      userId: req.session.userId,
      text: body.text,
      tradeId: body.tradeId,
    };
    const data = await tradeServices.addMessages(params);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getTradeMessages = async (req, res) => {
  try {
    const body = req.body;
    const params = {
      tradeId: body.tradeId || 1,
    };
    const data = await tradeServices.getTradeMessages({ ...body, ...params });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const body = req.params;
    const params = {
      tradeId: body.tradeId,
    };
    const data = await tradeServices.getTradeById({ ...params });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
