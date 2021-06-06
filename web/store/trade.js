import { types } from "./types";
import { v4 as uuidv4 } from "uuid";
import tradeServices from "../services/trades";

export const namespaced = false;

export const state = () => ({
  recentChats: [],
  current: {
    header: null,
    members: null,
    messages: {
      order: "DESC",
      page: 1,
      limit: 1,
      count: 0,
      last: false,
      rows: []
    }
  }
});

export const getters = {
  [types.getters.GET_CURRENT_MESSAGE]: state => {
    return state.current.messages.rows.slice().reverse();
  },

  [types.getters.GET_RECENT_CHATS]: state => {
    return state.recentChats.slice().reverse();
  },

  [types.getters.IS_TRADED]: state => {
    return state.current.header.isTraded;
  }
};

export const mutations = {
  [types.mutations.SET_RECENT_CHATS](state, messages) {
    state.recentChats = messages;
  },
  [types.mutations.SET_CURRENT_CHAT_HEADER](state, header) {
    state.current.header = header;
  },
  [types.mutations.SET_CURRENT_CHAT_MESSAGES](state, messages) {
    state.current.messages = messages;
  },
  [types.mutations.SET_CURRENT_CHAT_MEMBERS](state, members) {
    state.current.members = members;
  },
  [types.mutations.ADD_TRADE_MESSAGE](state, message) {
    state.current.messages.rows = [message, ...state.current.messages.rows];

    let recentIndex = null;
    state.recentChats.forEach((item, idx) => {
      if (item.id === message.tradeId) recentIndex = idx;
    });

    if (recentIndex !== null) {
      state.recentChats = state.recentChats.map(item =>
        item.id === message.tradeId
          ? { ...item, tradeMessages: [message] }
          : item
      );
      // [recentIndex].tradeMessages[0] = message;
    }
  },
  [types.mutations.UPDATE_TRADE_MESSAGE](state, { id, message }) {
    let index = null;

    state.current.messages.rows.forEach((item, idx) => {
      if (item.id === id) index = idx;
    });

    if (index !== null) {
      return (state.current.messages.rows[index] = message);
    }

    state.current.messages.rows = [message, ...state.current.messages.rows];

    // state.current.messages.rows = state.current.messages.rows.map(item =>
    //   item.id === id ? message : item
    // );
  },
  [types.mutations.SET_IS_TRADED](state, { tradeId }) {
    state.current.header.isTraded = true;

    state.recentChats = state.recentChats.filter(item => item.id !== tradeId);
  }
};

export const actions = {
  async [types.actions.CREATE_TRADE](
    { commit, state, dispatch, getters, rootState },
    { offerId, postId, message }
  ) {
    try {
      const response = await tradeServices.createTradeRoom({
        offerId,
        postId,
        message
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.FETCH_RECENT_CHATS]({
    commit,
    state,
    dispatch,
    getters,
    rootState
  }) {
    try {
      const response = await tradeServices.getMyTrades({
        order: "DESC",
        page: 1,
        limit: 10
      });

      console.log("Recent Chat", response);
      if (response.success) {
        commit(types.mutations.SET_RECENT_CHATS, response.data.trades);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.FETCH_CURRENT_CHAT](
    { commit, state, dispatch, getters, rootState },
    id
  ) {
    try {
      const response = await tradeServices.getTradeById({ tradeId: id });
      console.log("CURRENT CHAT", response);
      if (response.success) {
        commit(types.mutations.SET_CURRENT_CHAT_MEMBERS, response.data.members);
        commit(types.mutations.SET_CURRENT_CHAT_HEADER, response.data.header);
        commit(
          types.mutations.SET_CURRENT_CHAT_MESSAGES,
          response.data.messages
        );
      }
    } catch (error) {}
  },
  async [types.actions.ADD_TRADE_MESSAGE](
    { commit, state, dispatch, getters, rootState },
    text
  ) {
    try {
      const tempId = uuidv4();
      const tradeId = state.current.header.id;
      const tempMessage = {
        id: tempId,
        text: text,
        tradeId,
        created_at: new Date(),
        userId: rootState.auth.user.id,
        user: rootState.auth.user
      };

      console.log(tempMessage);
      commit(types.mutations.ADD_TRADE_MESSAGE, tempMessage);
      console.log("TradeId", tradeId);
      const response = await tradeServices.addTradeMessage({
        text,
        tempId,
        tradeId
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.FETCH_MORE_MESSAGES]({
    commit,
    state,
    dispatch,
    getters,
    rootState
  }) {
    try {
      const tradeId = state.current.header.id;
      const { order, limit, page, last, rows } = state.current.messages;

      if (!last) {
        const response = await tradeServices.getTradesMessages({
          tradeId,
          order,
          limit,
          page: page + 1
        });

        console.log("FETCHED MORE MESSAGES: ", response);

        if (response.success) {
          commit(types.mutations.SET_CURRENT_CHAT_MESSAGES, {
            ...response.data.messages,
            rows: [...rows, ...response.data.messages.rows]
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.ACCEPT_TRADE](
    { commit, state, dispatch, getters, rootState },
    { tradeId }
  ) {
    try {
      const response = await tradeServices.acceptTrade({ tradeId });
    } catch (error) {
      console.error(error);
    }
  }
};
