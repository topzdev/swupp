const Sequelize = require("sequelize");
const Op = require("sequelize").Op;
const sequelize = require("../../config/sequelize");

const UserModel = require("../user/models/User");
const PostModel = require("../post/models/Post");
const TradesModel = require("../trades/models/Trades");
const TradeMessagesModel = require("../trades/models/TradeMessages");

exports.findTrade = async ({ postId, offerId }) => {
  return TradesModel.findOne({
    where: { postId, offerId },
    attributes: ["isTraded"],
  });
};

exports.createTrade = async ({
  offerCreatorId,
  postCreatorId,
  message,
  postId,
  offerId,
}) => {
  // check if
  const t = await sequelize.transaction();

  await TradesModel.create({ offerCreatorId, postCreatorId, postId, offerId });

  await TradeMessagesModel.create({ text: message });
};
