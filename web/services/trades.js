import apiClient from "./axiosClient";

export default {
  async createTradeRoom({ postId, offerId, message }) {
    const response = await apiClient.$post("api/v1/trades/create", {
      postId,
      offerId,
      message
    });
    return response;
  },

  async getMyTrades({ order = "DESC", limit = 10, page = 1 }) {
    console.log(order, limit, page);
    const response = await apiClient.$post("api/v1/trades/my-trades", {
      order,
      limit,
      page
    });
    return response;
  },

  async getTradesMessages({ tradeId, order = "DESC", limit = 10, page = 1 }) {
    const response = await apiClient.$post("api/v1/trades/messages", {
      order,
      limit,
      page,
      tradeId
    });
    return response;
  },

  async getTradeById({ tradeId }) {
    const response = await apiClient.$get(
      "api/v1/trades/getTradeById/" + tradeId
    );

    return response;
  },

  async addTradeMessage({ text, tradeId }) {
    const response = await apiClient.$post("api/v1/trades/add-message", {
      text,
      tradeId
    });
    return response;
  },

  async isTradeExist({ offerId, postId }) {
    const response = await apiClient.$post("api/v1/trades/isTradeExist", {
      offerId,
      postId
    });
    return response;
  },

  async isTraded({ tradeId }) {
    const response = await apiClient.$get("api/v1/trades/isTraded/" + tradeId, {
      offerId,
      postId
    });
    return response;
  }
};
