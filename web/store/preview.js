import { types } from "./types";
import postsServices from "../services/posts";

export const state = () => ({
  post: null
});

export const mutations = {
  [types.mutations.SET_PREVIEW_POST](state, post) {
    state.post = post;
  }
};

export const actions = {
  async [types.actions.FETCH_PREVIEW_POST](
    { commit, state, dispatch, getters, rootState },
    id
  ) {
    try {
      console.log("POST ID", id);
      const data = await postsServices.getPostPreviewById(id);
      console.log("Fetching post", data);
      let photos = data.photos;

      if (photos.length) {
        photos = photos.sort(function(x, y) {
          return x.isCover === y.isCover ? 0 : x ? -1 : 1;
        });
      }

      data.photos = photos;

      commit(types.mutations.SET_PREVIEW_POST, data);
    } catch (error) {
      console.error(error);
    }
  },
  async [types.actions.CLEAR_PREVIEW_POST]({ commit }) {
    commit(types.mutations.SET_PREVIEW_POST, null);
  }
};
