import { Post } from "../types";
import axios from "@/configs/axiosConfig";

const postAPI = {
  async getUserPostById(id: Post["id"]) {
    const response = await axios.get("/api/v1/post/get/" + id);
    return response.data;
  },
  async likePost(postId: Post["id"]) {
    const response = await axios.post("/api/v1/post/like/", { postId });
    return (response as any).liked;
  },
};

export default postAPI;
