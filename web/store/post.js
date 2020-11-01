import { types } from "./types";

export const namespaced = false;

export const state = () => ({
  current: {
    title: "3131",
    price: 0,
    categoryId: "1",
    qualityId: "1",
    conditionId: "1",
    description: "1",
    prefered: "",
    photos: []
  },
  options: {
    categories: [{ id: 1, value: "Car" }],
    qualities: [{}],
    conditions: [
      {
        id: 1,
        value: "new"
      },
      {
        id: 2,
        value: "like new"
      },
      {
        id: 3,
        value: "excellent"
      },
      {
        id: 4,
        value: "good"
      },
      {
        id: 5,
        value: "fair"
      },
      {
        id: 6,
        value: "salvage"
      }
    ]
  }
});

export const mutations = {
  [types.mutations.POST_UPDATE_CURRENT](state, { key, value }) {
    state.current[key] = value;
  }
};

export const actions = {
  async [types.actions.POST_CREATE]({ commit, state }) {
    try {
      const formData = new FormData();
      const post = state.current;

      post.photos.forEach(item => {
        formData.append("photos.photo", item.photo);
        formData.append("photos.description", item.description);
      });

      const result = await this.$axios.$post("/api/v1/photo/test", formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
};
