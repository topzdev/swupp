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
    console.log("Mutation general", data);
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
  async [types.actions.CHANGE_ACOUNT_INFO]({ firstname, lastname, birthdate }) {
    try {
      const response = await userSettingsServices.updateAccountInfo({
        firstname,
        lastname,
        birthdate
      });
      console.log(response);

      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "User Settings",
          body: "Profile and cover photo updated",
          type: "success",
          timeout: 10000
        },
        { root: true }
      );
    } catch (error) {
      console.log(error);
    }
  }
};
