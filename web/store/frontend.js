import { types } from "./types";

export const namespaced = false;

export const state = () => ({
  snackbars: {
    show: false,
    pos: "",
    title: "",
    type: "",
    body: "",
    showClose: false,
    timeout: 5000,
    image: "",
    link: ""
  },
  dialog: {
    show: false,
    message: "",
    type: "",
    title: "",
    isQuestion: false,
    yesLabel: "",
    timeout: 5000,
    noLabel: "",
    okayLabel: "",
    showClose: true,
    yesFunction: undefined,
    noFuntion: undefined
  },
  modals: {
    auth: {
      show: false,
      title: "",
      message: "",
      submitFunction: undefined
    }
  }
});

export const mutations = {
  [types.mutations.SET_SNACKBAR](state, payload) {
    state.snackbars = payload;
  },
  [types.mutations.SET_DIALOG](state, payload) {
    state.dialog = payload;
  },
  [types.mutations.SET_AUTH_MODAL](state, payload) {
    state.modals.auth = payload;
  }
};

export const actions = {
  [types.actions.SHOW_SNACKBAR]({ commit, state }, config) {
    let newConfig = config;
    newConfig = { ...newConfig, show: true };

    if (!config.timeout) newConfig = { ...newConfig, showClose: true };
    commit(types.mutations.SET_SNACKBAR, newConfig);

    if (config && config.timeout)
      setTimeout(function() {
        commit(types.mutations.SET_SNACKBAR, {
          ...state.snackbars,
          show: false
        });
      }, config.timeout);
  },
  [types.actions.SHOW_AUTH_MODAL]({ commit, state }, config) {
    commit(types.mutations.SET_AUTH_MODAL, { ...state.modals.auth, ...config });
  },
  [types.actions.HIDE_SNACKBAR]({ commit, state }) {
    commit(types.mutations.SET_SNACKBAR, { ...state.snackbars, show: false });
  },
  [types.actions.SHOW_DIALOG]({ commit, state }, config) {
    let newConfig = config;
    newConfig = { ...newConfig, show: true };

    if (!config.timeout) newConfig = { ...newConfig, showClose: true };
    commit(types.mutations.SET_DIALOG, newConfig);

    if (config && config.timeout)
      setTimeout(function() {
        commit(types.mutations.SET_DIALOG, {
          ...state.dialog,
          showClose: true,
          show: false
        });
      }, config.timeout);
  },
  [types.actions.HIDE_DIALOG]({ commit, state }) {
    commit(types.mutations.SET_DIALOG, {
      ...state.dialog,
      show: false,
      showClose: true
    });
  }
};
