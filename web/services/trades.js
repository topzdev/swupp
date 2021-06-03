import apiClient from "./axiosClient";

export default {
  async createTradeRoom({ postId, offerId, message }) {
    const response = await apiClient.$post("api/v1/trades/create", {
      postId,
      offerId,
      message
    });
    return response.data;
  },

  async getMyTrades({ order = "DESC", limit = 10, page = 1 }) {
    const response = await apiClient.$post("api/v1/trades/my-trades", {
      order,
      limit,
      page
    });
    return response.data;
  },

  async getTradesMessages({ tradeId, order = "DESC", limit = 10, page = 1 }) {
    const response = await apiClient.$post("api/v1/trades/my-trades", {
      order,
      limit,
      page,
      tradeId
    });
    return response.data;
  },

  async addTradeMessage({ text, tradeId }) {
    const response = await apiClient.$post("api/v1/trades/add-message", {
      text,
      tradeId
    });
    return response;
  }
};
