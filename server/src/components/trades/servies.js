const Sequelize = require("sequelize");
const Op = require("sequelize").Op;
const sequelize = require("../../config/sequelize");

const UserModel = require("../user/models/User");
const PostModel = require("../post/models/Post");
const TradesModel = require("../trades/models/Trades");
const TradeMessagesModel = require("../trades/models/TradeMessages");
const ProfileModel = require("../profile/models/Profile");
const ProfilePhotoModel = require("../profile/models/ProfilePhoto");
const PostPhotoModel = require("../post/models/PostPhoto");

exports.findTrade = async ({ postId, offerId }) => {
  return TradesModel.findOne({
    where: { postId, offerId },
    attributes: ["isTraded"],
  });
};

exports.createTrade = async ({
  offerCreatorId,
  // postCreatorId,
  message,
  postId,
  offerId,
}) => {
  // check if
  const t = await sequelize.transaction();

  const isExist = await this.findTrade({ postId, offerId });

  if (isExist) {
    return {
      success: false,
      message: "Trade room already exist",
    };
  }

  const post = await PostModel.findByPk(postId, {
    include: [
      {
        model: UserModel,
        as: "user",
        attributes: ["id"],
      },
    ],
    transaction: t,
  });

  console.log("POST", post);
  if (!post) {
    return {
      success: false,
      message: "Post does not available or deleted",
    };
  }

  const trade = await TradesModel.create(
    {
      offerCreatorId,
      postCreatorId: 2,
      postId,
      offerId,
      message,
    },
    { transaction: t }
  );
  console.log("TRADE", trade);
  const initMessage = await TradeMessagesModel.create(
    { text: message, tradeId: trade.id, userId: offerCreatorId },
    {
      transaction: t,
    }
  );

  console.log("MESSAGE:", initMessage);
  await t.commit();

  return {
    success: true,
    data: {
      tradeId: trade.id,
      messageId: initMessage.id,
    },
    message: "Trade room created",
  };
};

exports.getCurrentUserTrades = async ({
  order = "DESC",
  limit = 10,
  page = 1,
  userId,
}) => {
  /* 
  
    Get all trades of the current user
    - Fetch the offerCreator
    - Get the first
    - Get the post photo
  */

  const postOption = {
    model: PostModel,
    attributes: ["title", "id"],
    include: [
      {
        model: PostPhotoModel,
        as: "photos",
        attributes: [
          "id",
          "url",
          "securedUrl",
          "caption",
          "isCover",
          "publicId",
        ],
        where: {
          isCover: true,
        },
        limit: 1,
      },
    ],
  };

  var userOption = {
    model: UserModel,
    attributes: ["username", "id"],
    include: [
      {
        model: ProfileModel,
        attributes: ["firstname", "lastname"],
      },
    ],
  };
  console.log("USER ID", userId);
  const trades = await TradesModel.findAll({
    where: {
      [Op.or]: {
        offerCreatorId: userId,
        postCreatorId: userId,
      },
      isTraded: false,
    },
    include: [
      {
        ...userOption,
        foreignKey: "offerCreatorId",
        as: "offerCreator",
      },
      {
        ...postOption,
        foreignKey: "postId",
        as: "mainPost",
      },
      {
        ...postOption,
        foreignKey: "offerId",
        as: "offerPost",
      },
      {
        model: TradeMessagesModel,
        foreignKey: "tradeId",
        limit: 1,
        // as: "lastMessage",
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: UserModel,
            attributes: ["username", "id"],
            include: [
              {
                model: ProfileModel,
                attributes: ["firstname", "lastname"],
              },
            ],
          },
        ],
      },
    ],
    order: [["createdAt", order]],
    limit,
    offset: (page - 1) * limit,
  });

  console.log(trades);
  return {
    success: true,
    data: {
      trades,
    },
    message: "My Trades Fetched",
  };
};

exports.addMessages = async ({ userId, tradeId, text }) => {
  const message = await TradeMessagesModel.create({ userId, tradeId, text });

  return {
    success: true,
    data: {
      messageId: message.id,
    },
  };
};

exports.getTradeMessages = async ({
  tradeId,
  order = "DESC",
  limit = 10,
  page = 1,
}) => {
  const messages = await TradeMessagesModel.findAll({
    where: { tradeId },
    order: [["createdAt", order]],
    limit,
    offset: (page - 1) * limit,
    include: [
      {
        model: UserModel,
        attributes: ["username", "id"],
        include: [
          {
            model: ProfileModel,
            attributes: ["firstname", "lastname"],
            include: [
              {
                model: ProfilePhotoModel,
                as: "profilePhoto",
                attributes: ["publicId", "url", "securedUrl", "id"],
              },
            ],
          },
        ],
      },
    ],
  });

  return {
    success: true,
    data: {
      messages,
    },
  };
};

exports.getTradeById = async ({ tradeId }) => {
  const postOption = {
    model: PostModel,
    attributes: ["title", "id"],
    include: [
      {
        model: PostPhotoModel,
        as: "photos",
        attributes: [
          "id",
          "url",
          "securedUrl",
          "caption",
          "isCover",
          "publicId",
        ],
        where: {
          isCover: true,
        },
        limit: 1,
      },
    ],
  };

  var userOption = {
    model: UserModel,
    attributes: ["username", "id"],
    include: [
      {
        model: ProfileModel,
        attributes: ["firstname", "lastname"],
      },
    ],
  };

  const trade = await TradesModel.findByPk(tradeId, {
    include: [
      {
        ...userOption,
        foreignKey: "offerCreatorId",
        as: "offerCreator",
      },
      {
        ...postOption,
        foreignKey: "postId",
        as: "mainPost",
      },
      {
        ...postOption,
        foreignKey: "offerId",
        as: "offerPost",
      },
    ],
  });

  const messages = await this.getTradeMessages({ tradeId });

  console.log(trade);
  return {
    success: true,
    data: {
      header: trade,
      messages: messages.data.messages,
    },
    message: "Trade Fetched",
  };
};
