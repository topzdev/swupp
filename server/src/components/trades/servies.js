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
const pusher = require("../../config/pusher");
const channels = require("../../config/channels");

exports.isExist = async ({ postId, offerId }) => {
  return await TradesModel.findOne({
    where: { postId, offerId },
    attributes: ["id"],
  });
};

exports.isTraded = async ({ tradeId }) => {
  const trade = await TradesModel.findOne({
    where: { id: tradeId, isTraded: true },
  });
  return trade === null ? false : true;
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
  try {
    const isExist = await this.isExist({ postId, offerId });

    if (isExist) {
      return {
        success: false,
        data: {
          isExist: true,
        },
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
    console.log("Creating room...");

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
  } catch (error) {
    await t.rollback();
  }
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
        as: "tradeMessages",
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

exports.addMessages = async ({ userId, tradeId, text, tempId }) => {
  console.log("Services test", userId, tradeId);
  const t = await sequelize.transaction();

  try {
    const message = await TradeMessagesModel.create(
      { userId, tradeId, text },
      { transaction: t }
    );

    pusher.trigger(channels.tradeMessage, `trade-${tradeId}`, {
      tempId,
      message,
    });

    await t.commit();

    return {
      success: true,
    };
  } catch (error) {
    await t.rollback();
  }
};

exports.getTradeMessages = async ({
  tradeId,
  order = "DESC",
  limit = 10,
  page = 1,
}) => {
  const messages = await TradeMessagesModel.findAndCountAll({
    where: { tradeId },
    order: [["createdAt", order]],
    limit,
    offset: (page - 1) * limit,
    // include: [
    //   {
    //     model: UserModel,
    //     attributes: ["username", "id"],
    //     include: [
    //       {
    //         model: ProfileModel,
    //         attributes: ["firstname", "lastname"],
    //         include: [
    //           {
    //             model: ProfilePhotoModel,
    //             as: "profilePhoto",
    //             attributes: ["publicId", "url", "securedUrl", "id"],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  });

  return {
    success: true,
    data: {
      messages: {
        ...messages,
        last: messages.count <= page * limit,
        limit,
        page,
        order,
      },
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

  const userOption = {
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
  };

  console.log("TradeId", tradeId);

  let trade = await TradesModel.findOne({
    where: {
      id: tradeId,
    },
    plain: true,
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
        foreignKey: "offerCreatorId",
        as: "offerCreator",
      },
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
        foreignKey: "postCreatorId",
        as: "postCreator",
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

  let rawTrade = trade.get({ plain: true });

  const members = {
    [rawTrade.offerCreator.id]: rawTrade.offerCreator,
    [rawTrade.postCreator.id]: rawTrade.postCreator,
  };

  delete rawTrade.offerCreator;
  delete rawTrade.postCreator;

  const messages = await this.getTradeMessages({ tradeId });
  console.log("Current Trade", rawTrade);

  // console.log("Current Trade", trade);
  return {
    success: true,
    data: {
      header: rawTrade,
      members,
      messages: messages.data.messages,
    },
    message: "Trade Fetched",
  };
};

exports.acceptTrade = async ({ tradeId }) => {
  console.log("Accept Trade", tradeId);
  const t = await sequelize.transaction();
  try {
    const updatedTrade = await TradesModel.update(
      { isTraded: true },
      { where: { id: tradeId }, transaction: t }
    );

    const trade = await TradesModel.findByPk(tradeId);

    console.log(trade, updatedTrade);
    const offerPost = await PostModel.update(
      { isTraded: true },
      { where: { id: trade.offerId }, transaction: t }
    );

    const mainPost = await PostModel.update(
      { isTraded: true },
      { where: { id: trade.postId }, transaction: t }
    );

    await t.commit();

    pusher.trigger(channels.tradeAccepted, `trade-${tradeId}`, {
      accepted: true,
      tradeId,
    });

    return {
      success: true,
      data: {
        accepted: true,
      },
      message: "Trade Accepted",
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
