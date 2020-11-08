import { types } from "./types";
import { initPost, initUpdatePost } from "../constants";

export const namespaced = false;

export const state = () => ({
  create: initPost,
  update: initUpdatePost,
  options: {}
});

export const getters = {
  getCoverPhoto: state => crud => {
    const photos = state[crud].photos;
    const photoFiltered = photos.filter(item => item.isCover);
    if (photos.length && photoFiltered.length) {
      return photoFiltered[0].url;
    }
    return null;
  }
};

export const mutations = {
  [types.mutations.CHANGE_POST](state, { key, value, crud }) {
    console.log("Mode", crud);
    state[crud][key] = value;

    if (
      state[crud].photos.length &&
      !state[crud].photos.filter(item => item.isCover).length
    ) {
      state[crud].photos[0].isCover = true;
    }
  },
  [types.mutations.SET_POST_UPDATE](state, post) {
    state.update = post;
  },

  [types.mutations.CLEAR_FIELDS](state, form) {
    if (form === "create") state.create = initPost;
    if (form === "update") state.update = initPost;
  }
};

export const actions = {
  async [types.actions.FETCH_POST]({ commit }, id) {
    try {
      const result = await this.$axios.$get("/api/v1/post/get/" + id);
      console.log(result);
      commit(types.mutations.SET_POST_UPDATE, {
        ...result.data.post,
        deletedPhotoIds: [],
        newPhotos: [],
        photoInfo: []
      });
    } catch (error) {}
  },

  async [types.actions.POST_CREATE]({ commit, state, dispatch, getters }) {
    try {
      const formData = new FormData();
      const post = state.create;

      for (let property in post) {
        if (post.hasOwnProperty(property) && property !== "photos") {
          formData.append(property, post[property]);
        }
      }
      console.log(post.photos.map(item => item.caption));

      post.photos.forEach((item, idx) => {
        formData.append("photos.photo" + idx, item.photo);
        formData.append("photos.caption" + idx, item.caption);
        formData.append("photos.isCover" + idx, item.isCover);
        console.log("Created", item);
      });

      const result = await this.$axios.$post("/api/v1/post/create", formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });

      console.log(result.data);

      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Post successfully posted",
          body: post.title,
          type: "success",
          timeout: 10000,
          image: getters.getCoverPhoto
        },
        { root: true }
      );

      $nuxt.$router.push("/");

      commit(types.mutations.CLEAR_FIELDS, "create");
    } catch (error) {
      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Something went wrong",
          body: "error on uploading post :(",
          type: "error",
          timeout: 5000
        },
        { root: true }
      );
    }
  },
  async [types.actions.POST_UPDATE]({ commit, state }) {
    try {
      /* 
        Database needs 

        post information like id, title etc..
        newPhotos - new uploaded photos on update
        deletedPhotoIds - all remove photo public_ids

      */

      try {
        const formData = new FormData();
        const post = state.update;

        for (let property in post) {
          if (post.hasOwnProperty(property) && property !== "photos") {
            formData.append(property, post[property]);
          }
        }
        console.log(post.photos.map(item => item.caption));

        post.photos.forEach((item, idx) => {
          if (item.update) {
            formData.append("newPhotos.photo" + idx, item.photo);
            formData.append("newPhotos.caption" + idx, item.caption);
            formData.append("newPhotos.isCover" + idx, item.isCover);
          }
        });

        const result = await this.$axios.$get("/api/v1/post/create", formData, {
          headers: {
            "Content-type": "multipart/form-data"
          }
        });

        console.log(result.data);

        dispatch(
          types.actions.SHOW_SNACKBAR,
          {
            title: "Post successfully posted",
            body: post.title,
            type: "success",
            timeout: 10000,
            image: getters.getCoverPhoto
          },
          { root: true }
        );

        $nuxt.$router.push("/");

        commit(types.mutations.CLEAR_FIELDS);
      } catch (error) {}
    } catch (error) {
      console.error(error);
    }
  },

  async [types.actions.POST_REMOVE]({ commit, state }) {
    try {
      /* 
      
      Database needs

      post id
      
      
      */
    } catch (error) {
      console.error(error);
    }
  }
};
