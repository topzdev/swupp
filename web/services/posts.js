import apiClient from "./axiosClient";

export default {
  async getPosts({
    order = "DESC",
    limit = 25,
    page = 1,
    categoryId,
    conditionId
  }) {
    const response = await apiClient.$get("api/v1/post/get", {
      order,
      limit,
      page,
      categoryId,
      conditionId
    });
    return response;
  }
};
