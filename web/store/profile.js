import { types } from "./types";
import profileServices from "../services/profile";
import { initProfile } from "../constants";
import profile from "../services/profile";

export const state = () => ({
  current: null,
  about: null,
  posts: {
    count: 5,
    cursor: null,
    hasNext: false,
    username: null,
    items: []
  },
  modals: {
    changePhotos: false
  }
});

export const mutations = {
  [types.mutations.SET_CURRENT_PROFILE](state, data) {
    state.current = data;
  },
  [types.mutations.SET_ABOUT_PROFILE](state, data) {
    state.about = data;
  },

  [types.mutations.SET_CURRENT_PROFILE_POST](state, data) {
    state.posts = data;
  },
  [types.mutations.SET_PROFILE_MODAL](state, config) {
    state.modals.changePhotos = config;
  },
  [types.mutations.SET_CURRENT_PROFILE_PHOTO](state, data) {
    state.current.profilePhoto = data;
  },
  [types.mutations.SET_CURRENT_COVER_PHOTO](state, data) {
    state.current.coverPhoto = data;
  }
};

export const actions = {
  async [types.actions.FETCH_PROFILE]({ commit, state }, { username }) {
    try {
      const data = await profileServices.getProfile({ username });
      commit(types.mutations.SET_CURRENT_PROFILE, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [types.actions.FETCH_PROFILE_ABOUT]({ commit, state }, { username }) {
    try {
      const data = await profileServices.getProfileAbout({ username });

      commit(types.mutations.SET_ABOUT_PROFILE, { username, ...data });
    } catch (error) {
      console.log(error);
    }
  },
  async [types.actions.FETCH_PROFILE_POSTS]({ commit }, { username }) {
    try {
      const data = await profileServices.getProfilePost({ username });
      console.log(data);
      commit(types.mutations.SET_CURRENT_PROFILE_POST, { username, ...data });
    } catch (error) {
      console.log(error);
    }
  },
  async [types.actions.POST_COVER_PHOTO]({ commit, state, dispatch, getters }) {
    try {
      const data = await profileServices.getProfilePost({ username });
      console.log(data);
      commit(types.mutations.SET_CURRENT_PROFILE);
    } catch (error) {}
  },

  [types.actions.SHOW_PROFILE_CHANGE_MODAL]({ commit, dispatch }, show) {
    commit(types.mutations.SET_PROFILE_MODAL, show);
  },

  async [types.actions.UPDATE_PROFILE_PHOTOS](
    { commit, state, dispatch, getters },
    { profilePhoto, coverPhoto }
  ) {
    try {
      let profileData, coverData;

      if (profilePhoto.flag === "update") {
        const { id, publicId, photo } = profilePhoto;

        profileData = await profileServices.updateProfilePhoto({
          id,
          publicId,
          photo
        });
      }

      if (coverPhoto.flag === "update") {
        const { id, publicId, photo } = coverPhoto;

        coverData = await profileServices.updateCoverPhoto({
          id,
          publicId,
          photo
        });
      }

      console.log("Photo Data", profilePhoto);
      console.log("Photo Raw", profileData);

      if (coverPhoto.flag === "update") {
        console.log("Cover photo");
        commit(types.mutations.SET_CURRENT_COVER_PHOTO, coverData.photo);
      }

      if (profilePhoto.flag === "update") {
        console.log("Updating profile");
        commit(types.mutations.SET_CURRENT_PROFILE_PHOTO, profileData.photo);
      }

      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Profile Photos",
          body: "Profile and cover photo updated",
          type: "success",
          timeout: 10000
        },
        { root: true }
      );

      dispatch(types.actions.SHOW_PROFILE_CHANGE_MODAL, false);
    } catch (error) {
      console.log(error);
    }
  },

  async [types.actions.REMOVE_PROFILE_PHOTO](
    { commit, state, dispatch, getters },
    { id, publicId, photo }
  ) {
    try {
      const data = await profileServices.removeProfilePhoto({
        id,
        publicId,
        photo
      });
      commit(types.mutations.SET_CURRENT_PROFILE_PHOTO, {
        url: "",
        securedUrl: "",
        publicId: ""
      });
      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Profile Updates",
          body: "Profile photo removed",
          type: "success",
          timeout: 10000
        },
        { root: true }
      );
    } catch (error) {
      console.log(error);
    }
  },
  async [types.actions.REMOVE_COVER_PHOTO](
    { commit, state, dispatch, getters },
    { id, publicId, photo }
  ) {
    try {
      const data = await profileServices.removeCoverPhoto({
        id,
        publicId,
        photo
      });
      commit(types.mutations.SET_CURRENT_COVER_PHOTO, {
        url: "",
        securedUrl: "",
        publicId: ""
      });
      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Profile Updates",
          body: "Cover photo removed",
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
