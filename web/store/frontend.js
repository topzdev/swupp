import { types } from "./types";

export const namespaced = false;

export const state = () => ({
  snackbars: {
    show: false,
    pos: "right-bottom",
    title: "Post successfully uploaded",
    type: "success",
    body: "Ghosr mountain bike for i5 laptop and rtx 2060",
    showClose: false,
    timeout: 5000,
    image: "/_nuxt/assets/img/post-1.jpg"
  },
  options: {}
});

export const mutations = {
  [types.mutations.SET_SNACKBAR](state, payload) {
    console.log(payload);
    state.snackbars = payload;
  }
};

export const actions = {
  [types.actions.SHOW_SNACKBAR]({ commit, state }, config) {
    console.log(config);
    let newConfig = config;
    newConfig = { ...newConfig, show: true };

    if (!config.timeout) newConfig = { ...newConfig, showClose: true };
    commit(types.mutations.SET_SNACKBAR, newConfig);

    if (config && config.timeout)
      setTimeout(function() {
        console.log("Time out...");
        commit(types.mutations.SET_SNACKBAR, {
          ...state.snackbars,
          show: false
        });
      }, config.timeout);
  },
  [types.actions.HIDE_SNACKBAR]({ commit, state }) {
    commit(types.mutations.SET_SNACKBAR, { ...state.snackbars, show: false });
  }
};
