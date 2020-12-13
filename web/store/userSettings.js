import { types } from "./types";
import userSettingsServices from "../services/userSettings";

export const state = () => ({
  general: {
    profile: {
      firstname: "",
      lastname: "",
      birthdate: ""
    },
    username: "",
    email: ""
  }
});

export const mutations = {
  async [types.mutations.SET_GENERAL_INFO](state, data) {
    state.general = data;
  }
};

export const actions = {
  async [types.actions.FETCH_GENERAL_INFO]({ commit }) {
    try {
      const response = await userSettingsServices.getGenralInfo();

      commit(types.mutations.SET_GENERAL_INFO, response);
    } catch (error) {
      console.log(error);
    }
  },
  async [types.actions.CHANGE_ACOUNT_INFO]({ state }) {
    try {
      commit(types.actions.SHOW_AUTH_MODAL, {
        show: true,
        submitFunction: async function() {
          const response = await userSettingsServices.updateAccountInfo(
            state.general.profile
          );
        }
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
};
