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

  async getPostCount() {
    const response = await apiClient.$get("api/v1/post/count");
    return response;
  },

  async getPostPreviewById(id) {
    const response = await apiClient.$get(`api/v1/post/get/preview/${id}`);

    return {
      ...response.data.post,
      count: {
        views: 0,
        likes: 0,
        offers: 0
      },
      location: {
        city: "Metro, Manila",
        lat: 14.6091,
        lng: 121.0223
      }
    };
  }
};
