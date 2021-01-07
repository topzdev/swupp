import { types } from "./types";
import postsServices from "../services/posts";

export const state = () => ({
  homepage: {
    items: [],
    count: []
  }
});

export const getters = {};

export const mutations = {
  [types.mutations.SET_HOME_POSTS](state, posts) {
    state.homepage = posts;
  }
};

export const actions = {
  async [types.actions.FETCH_HOME_POSTS](
    { commit, state, dispatch, getters, rootState },
    query
  ) {
    try {
      const data = await postsServices.getPosts({
        page: 1,
        limit: 25,
        order: "DESC"
      });
      console.log("Fetching post", data);
      commit(types.mutations.SET_HOME_POSTS, data);
    } catch (error) {
      console.error(error);
    }
  }
};
