import apiClient from "./axiosClient";

export default {
  async getPosts({ order = "DESC", limit, page, categoryId, conditionId }) {
    const response = await apiClient.$post("api/v1/post/get", {
      order,
      limit,
      page,
      categoryId,
      conditionId
    });
    return response.data;
  },

  async getPostCount() {
    const response = await apiClient.$get("api/v1/post/count");
    return response;
  }
};
