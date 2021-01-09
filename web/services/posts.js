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
  }
};
