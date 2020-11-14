import { types } from "./types";
import profileServices from "../services/profile";

export const state = () => ({
  current: {
    firstname: "",
    lastname: "",
    postCount: 0,
    profilePhoto: {
      url: "",
      securedUrl: "",
      publicId: ""
    },
    coverPhoto: {
      url: "",
      securedUrl: "",
      publicId: ""
    },
    username: "",

    about: {
      overview: {
        phoneNumber: "",
        email: "",
        address: "",
        birthday: ""
      },
      socials: {
        fbUrl: "",
        instaUrl: "",
        websiteUrl: "",
        twitterUrl: "",
        birthdate: ""
      },
      addresses: [{}]
    }
  },
  posts: {
    count: 5,
    cursor: null,
    hasNext: false,
    items: []
  },
  modals: {
    changePhotos: false
  }
});

export const mutations = {
  [types.mutations.SET_CURRENT_PROFILE](state, data) {
    console.log("Setting up profile", data);
    state.current = { ...state.current, ...data };
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
  async [types.actions.FETCH_PROFILE](
    { commit, state, dispatch, getters },
    { username }
  ) {
    try {
      const data = await profileServices.getProfile({ username });
      console.log(data);

      commit(types.mutations.SET_CURRENT_PROFILE, data);
    } catch (error) {
      console.log(error);
    }
  },
  async [types.actions.FETCH_PROFILE_ABOUT](
    { commit, state, dispatch, getters },
    { username }
  ) {
    try {
      const data = await profileServices.getProfileAbout({ username });

      commit(types.mutations.SET_CURRENT_PROFILE, {
        ...state.current,
        about: data
      });
    } catch (error) {
      console.log(error);
    }
  },
  async [types.actions.FETCH_PROFILE_POSTS](
    { commit, state, dispatch, getters },
    { username }
  ) {
    try {
      const data = await profileServices.getProfilePost({ username });
      console.log(data);
      commit(types.mutations.SET_CURRENT_PROFILE_POST, data);
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
  async [types.actions.POST_PROFILE_PHOTO]({
    commit,
    state,
    dispatch,
    getters
  }) {
    try {
    } catch (error) {}
  },
  [types.actions.SHOW_PROFILE_CHANGE_MODAL]({ commit, dispatch }, show) {
    dispatch(types.mutations.SET_PROFILE_MODAL, show);
  },
  async [types.actions.UPDATE_PROFILE_PHOTO](
    { commit, state, dispatch, getters },
    { id, publicId, photo }
  ) {
    try {
      const data = await profileServices.updateProfilePhoto({
        id,
        publicId,
        photo
      });
      commit(types.mutations.SET_CURRENT_PROFILE_PHOTO, data.photo);

      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Profile photo",
          body: "cover photo updated",
          type: "success",
          timeout: 10000
        },
        { root: true }
      );
    } catch (error) {}
  },
  async [types.actions.UPDATE_COVER_PHOTO](
    { commit, state, dispatch, getters },
    { id, publicId, photo }
  ) {
    try {
      const data = await profileServices.updateCoverPhoto({
        id,
        publicId,
        photo
      });
      commit(types.mutations.SET_CURRENT_COVER_PHOTO, data.photo);
      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Cover photo",
          body: "profile photo updated",
          type: "success",
          timeout: 10000
        },
        { root: true }
      );
    } catch (error) {}
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
          title: "Profile photo",
          body: "profile photo removed",
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
          title: "Profile photo",
          body: "cover photo removed",
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
