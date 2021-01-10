import { types } from "./types";
import postsServices from "../services/posts";

export const state = () => ({
  postCount: 0,
  homepage: [],
  search: {
    items: [],
    count: null
  }
});

export const mutations = {
  [types.mutations.SET_HOME_POSTS](state, posts) {
    state.homepage = [...state.homepage, ...posts.items];
  },
  [types.mutations.SET_SEARCH_POSTS](state, posts) {
    state.search = posts;
  },
  [types.mutations.SET_POSTS_COUNT](state, count) {
    state.postCount = count;
  }
};

export const actions = {
  async [types.actions.FETCH_HOME_POSTS](
    { commit, state, dispatch, getters, rootState },
    query
  ) {
    try {
      console.log("Query ", query);
      const data = await postsServices.getPosts({
        ...query,
        order: "DESC"
      });
      console.log("Fetching post", data);
      commit(types.mutations.SET_HOME_POSTS, data);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.FETCH_SEARCH_POSTS](
    { commit, state, dispatch, getters, rootState },
    query
  ) {
    try {
      const data = await postsServices.getPosts({
        ...query,
        order: "DESC"
      });
      console.log("Fetching post", data);
      commit(types.mutations.SET_SEARCH_POSTS, data);
    } catch (error) {
      console.error(error);
    }
  },

  async [types.actions.FETCH_POSTS_COUNT]({ commit }) {
    try {
      const data = await postsServices.getPostCount();
      commit(types.mutations.SET_POSTS_COUNT, data);
    } catch (error) {
      console.error(error);
    }
  }
};
