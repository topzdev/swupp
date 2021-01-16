import apiClient from "./axiosClient";

export default {
  async getUserPostById(id) {
    const response = await apiClient.$get("/api/v1/post/get/" + id);
    return response.data;
  }
};
