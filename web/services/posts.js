import apiClient from "./axiosClient";

export default {
  async getPosts({ order = "DESC", limit, page, category, condition, search }) {
    const response = await apiClient.$post("api/v1/post/get", {
      order,
      limit,
      page,
      category,
      condition,
      search
    });
    return response.data;
  },

  async getCurrentUserPosts({ order = "DESC", limit, page, search }) {
    const response = await apiClient.$post("api/v1/post/get-user-post", {
      order,
      limit,
      page,
      search
    });
    return response.data;
  },

  async getPostCount() {
    const response = await apiClient.$get("api/v1/post/count");
    return response;
  },

  async getPlaces() {
    const response = await apiClient.$get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&key=AIzaSyDksdbqnNWl73-PMGqsXxe8dD67s0G0dpY"
    );
    return response;
  },

  async getPostPreviewById(id) {
    const response = await apiClient.$get(`api/v1/post/get/preview/${id}`);

    return {
      ...response.data.post
    };
  }
};
