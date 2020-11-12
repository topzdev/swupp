import { types } from "./types";

export const state = () => ({
  current: {
    firstname: "Christian",
    lastname: "Lugod",
    profilePhoto: {
      url:
        "https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.0-9/105049311_2493529057626472_8398877668556967082_o.jpg?_nc_cat=105&ccb=2&_nc_sid=a4a2d7&_nc_eui2=AeHWqjeTnKDLtZ9QL6nvqAr9XM4FzVCgauFczgXNUKBq4WXVCWN9f48Fi1deZ-PniW7fWxFSyj6Y49BbxeIFg43G&_nc_ohc=UUvUSPj1n10AX9EjKR0&_nc_ht=scontent.fmnl17-1.fna&oh=a71a2f5f653b950e7d5f9476466f9007&oe=5FD342C3",
      publicId: ""
    },
    coverPhoto: {
      url:
        "https://pbs.twimg.com/profile_banners/2940922927/1601537647/1500x500",
      publicId: ""
    },
    username: "topzdev",

    about: {
      overview: {
        phoneNumber: "09286665903",
        email: "christianlugod05@gmail.com",
        address: "1320 A 48 Cp Gacia st Tondo, Manila",
        birthday: "May 15, 2000"
      },
      addresses: [{}]
    }
  },
  posts: {
    count: 5,
    cursor: null,
    hasNext: false,
    items: [
      {
        id: 1,
        title: "Ghost Mountain Bike for your i5 Laptop",
        price: "$$$$",
        prefered: "I prefered laptop that has i7 processor and gtx 2060",
        counts: {
          comment: 25,
          views: 100
        },
        isTraded: false,
        conditionId: "Good",
        categoryId: "Bicycle",
        coverPhoto: {
          url: require("@/assets/img/post-2.png"),
          publicId: ""
        }
      }
    ]
  },
  modals: {
    changePhotos: true
  }
});

export const mutations = {
  [types.mutations.SET_PROFILE_MODAL](state, config) {
    state.modals.changePhotos = config;
  }
};

export const actions = {
  async [types.actions.FETCH_PROFILE]({ commit, state, dispatch, getters }) {
    try {
    } catch (error) {}
  },
  async [types.actions.FETCH_PROFILE_ABOUT]({
    commit,
    state,
    dispatch,
    getters
  }) {
    try {
    } catch (error) {}
  },
  async [types.actions.FETCH_PROFILE_POSTS]({
    commit,
    state,
    dispatch,
    getters
  }) {
    try {
    } catch (error) {}
  },
  async [types.actions.POST_COVER_PHOTO]({ commit, state, dispatch, getters }) {
    try {
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
  }
};
