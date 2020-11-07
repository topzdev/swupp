import { types } from "./types";
import parseBlobToData from "@/utils/parseBlobToData";

export const namespaced = false;

export const state = () => ({
  current: {
    title: "Hello Test",
    price: 0,
    categoryId: "bruh",
    conditionId: "tea",
    body: "2",
    prefered: "Myself :)",
    photos: [],
    isPriceHidden: false,
    isDraft: false
  },
  options: {}
});

export const getters = {
  async getCoverPhoto(state) {
    const photos = state.current.photos;
    const photoFiltered = photos.filter(item => item.isCover);
    if (photos.length && photoFiltered.length) {
      return await parseBlobToData(photoFiltered[0].photo);
    }
    return null;
  }
};

export const mutations = {
  [types.mutations.SET_POST_CURRENT](state, { key, value }) {
    state.current[key] = value;

    if (
      state.current.photos.length &&
      !state.current.photos.filter(item => item.isCover).length
    ) {
      state.current.photos[0].isCover = true;
    }
  }
};

export const actions = {
  async [types.actions.POST_CREATE]({ commit, state }) {
    try {
      const formData = new FormData();
      const post = state.current;

      /* 
      to send data 
      {
        {
          title: String,
          price: Number,
          categoryId: String,
          qualityId: String,
          conditionId: String,
          body: String,
          prefered: String,
          photos: [{
            photo: File
            isCover: Boolean,
            caption: String
          }]
        }
      }
      */

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

      console.log(result);
    } catch (error) {
      console.error(error);
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
