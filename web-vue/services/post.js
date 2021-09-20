import apiClient from "./axiosClient";

export default {
  async getUserPostById(id) {
    const response = await apiClient.$get("/api/v1/post/get/" + id);
    return response.data;
  },
  async likePost(postId) {
    const response = await apiClient.$post("/api/v1/post/like/", { postId });
    return response.liked;
  }
};
