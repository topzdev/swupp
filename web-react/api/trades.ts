import axios from "@/configs/axiosConfig";

const tradesAPI = {
  async createTradeRoom({ postId, offerId, message }: any) {
    const response = await axios.post("api/v1/trades/create", {
      postId,
      offerId,
      message,
    });
    return response;
  },

  async getMyTrades({ order = "DESC", limit = 10, page = 1 }: any) {
    console.log(order, limit, page);
    const response = await axios.post("api/v1/trades/my-trades", {
      order,
      limit,
      page,
    });
    return response;
  },

  async getTradesMessages({
    tradeId,
    order = "DESC",
    limit = 10,
    page = 1,
  }: any) {
    const response = await axios.post("api/v1/trades/messages", {
      order,
      limit,
      page,
      tradeId,
    });
    return response;
  },

  async getTradeById({ tradeId }: any) {
    const response = await axios.get("api/v1/trades/getTradeById/" + tradeId);

    return response;
  },

  async addTradeMessage({ text, tempId, tradeId }: any) {
    const response = await axios.post("api/v1/trades/add-message", {
      text,
      tempId,
      tradeId,
    });
    return response;
  },

  async isTradeExist({ offerId, postId }: any) {
    const response = await axios.post("api/v1/trades/isTradeExist", {
      offerId,
      postId,
    });
    return response;
  },

  async isTraded({ tradeId }: any) {
    const response = await axios.get("api/v1/trades/isTraded/" + tradeId);
    return response;
  },

  async acceptTrade({ tradeId }: any) {
    const response = await axios.post("api/v1/trades/acceptTrade/", {
      tradeId,
    });
    return response;
  },
};

export default tradesAPI;
