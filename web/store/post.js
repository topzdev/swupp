import { types } from "./types";
import { initPost, initUpdatePost } from "../constants";
import postServices from "../services/post";
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
      if (crud === "update") {
        if (photoFiltered[0].flag !== "deleted") return photoFiltered[0].url;
      } else {
        return photoFiltered[0].url;
      }
    }
    return null;
  }
};

export const mutations = {
  [types.mutations.CHANGE_POST](state, { key, value, crud }) {
    state[crud][key] = value;

    if (
      state[crud].photos.length &&
      !state[crud].photos.filter(item => item.isCover).length
    ) {
      if (crud === "update" && state[crud].photos[0].flag !== "new")
        state[crud].photos[0].flag = "updated";
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
    commit(types.mutations.SET_POST_UPDATE, initUpdatePost);
    try {
      let result = await postServices.getUserPostById(id);
      console.log(result);
      commit(types.mutations.SET_POST_UPDATE, {
        ...result
      });
    } catch (error) {}
  },

  async [types.actions.POST_CREATE]({
    commit,
    state,
    dispatch,
    getters,
    rootState
  }) {
    try {
      const formData = new FormData();
      const post = state.create;

      for (let property in post) {
        console.log(property);
        if (
          post.hasOwnProperty(property) &&
          property !== "photos" &&
          property !== "postLocation"
        ) {
          formData.append(property, post[property]);
        }

        if (property === "postLocation") {
          formData.append(property + ".lng", post[property].lng);
          formData.append(property + ".lat", post[property].lat);
          formData.append(property + ".name", post[property].name);
        }
      }

      post.photos.forEach((item, idx) => {
        formData.append("photos.photo" + idx, item.photo);
        formData.append("photos.caption" + idx, item.caption);
        formData.append("photos.isCover" + idx, item.isCover);
      });

      const result = await this.$axios.$post("/api/v1/post/create", formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });

      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Post successfully added",
          body: post.title,
          type: "success",
          timeout: 10000,
          link: "/post/" + result.data.id,
          image: getters.getCoverPhoto("create")
        },
        { root: true }
      );

      commit(types.mutations.CLEAR_FIELDS, "create");

      console.log(rootState.auth.user.username);

      $nuxt.$router.push({
        path: `profile/${rootState.auth.user.username}`,
        query: { refresh: 1 }
      });
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
  async [types.actions.POST_UPDATE]({ commit, state, dispatch, getters }) {
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
        if (
          post.hasOwnProperty(property) &&
          property !== "photos" &&
          property !== "postLocation"
        ) {
          formData.append(property, post[property]);
        }

        if (property === "postLocation") {
          formData.append(property + ".lng", post[property].lng);
          formData.append(property + ".lat", post[property].lat);
          formData.append(property + ".name", post[property].name);
        }
      }

      let npCount = 0,
        upCount = 0;

      post.photos.forEach(item => {
        if (item.flag === "new") {
          formData.append("newPhotos.photo" + npCount, item.photo);
          formData.append("newPhotos.caption" + npCount, item.caption);
          formData.append("newPhotos.isCover" + npCount, item.isCover);
          npCount++;
        } else if (item.flag === "updated") {
          formData.append("updatedPhotos.caption" + upCount, item.caption);
          formData.append("updatedPhotos.id" + upCount, item.id);
          formData.append("updatedPhotos.isCover" + upCount, item.isCover);
          upCount++;
        } else if (item.flag === "deleted") {
          formData.append("deletedPhotoIds", item.publicId);
        }
      });

      const result = await this.$axios.$put("/api/v1/post/update", formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });

      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Post successfully updated",
          body: post.title,
          type: "success",
          timeout: 10000,
          image: getters.getCoverPhoto("update")
        },
        { root: true }
      );

      // $nuxt.refresh();
      $nuxt.$router.push("/");

      commit(types.mutations.CLEAR_FIELDS, "update");
    } catch (error) {
      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Something went wrong",
          body: "error on updating post :(",
          type: "error",
          timeout: 5000
        },
        { root: true }
      );
    }
  },

  async [types.actions.POST_REMOVE]({ commit, state, dispatch, getters }) {
    try {
      const self = this;
      const post = state.update;
      /* 
      Database needs
      post id
      */
      dispatch(types.actions.SHOW_DIALOG, {
        title: "Deleting the post?",
        message: "Are you sure to delete this post?",
        yesLabel: "Delete",
        yesFunction: async () => {
          await self.$axios.$delete("/api/v1/post/delete/" + post.id);

          dispatch(
            types.actions.SHOW_SNACKBAR,
            {
              title: "Post successfully remove",
              body: post.title,
              type: "success",
              timeout: 10000,
              image: getters.getCoverPhoto("update")
            },
            { root: true }
          );

          commit(types.mutations.CLEAR_FIELDS, "update");
          $nuxt.$router.push("/");
        }
      });
    } catch (error) {
      dispatch(
        types.actions.SHOW_SNACKBAR,
        {
          title: "Something went wrong",
          body: "error on deleting post :(",
          type: "error",
          timeout: 5000
        },
        { root: true }
      );
    }
  }
};
