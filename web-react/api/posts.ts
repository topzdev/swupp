import axios from "@/configs/axiosConfig";
import {
  CoverPhoto,
  Post,
  PostCount,
  ProfilePhoto,
  User,
  UserProfile,
} from "../global";

type GetPostsParams = {
  order?: "DESC" | "ASC";
  limit?: number;
  page?: number;
  category?: string;
  condition?: string;
  search?: string;
  allowTraded?: string;
};

export type GetPostReturn = Post & {
  user: Pick<User, "username" | "id"> & {
    profile: Pick<UserProfile, "firstname" | "lastname"> & {
      profilePhoto: ProfilePhoto;
    };
  };
  coverPhoto: CoverPhoto;
  counts: PostCount;
};

const postsAPI = {
  async getPosts({
    order = "DESC",
    limit,
    page,
    category,
    condition,
    search,
  }: GetPostsParams): Promise<{
    items: GetPostReturn[];
    count: number;
    last: boolean;
  }> {
    const response = await axios.post("api/v1/post/get", {
      order,
      limit,
      page,
      category,
      condition,
      search,
    });
    return response.data.data;
  },

  async getCurrentUserPosts({
    order = "DESC",
    limit,
    page,
    search,
    allowTraded,
  }: GetPostsParams) {
    const response = await axios.post("api/v1/post/get-user-post", {
      order,
      limit,
      page,
      search,
      allowTraded,
    });
    return response.data;
  },

  async getPostCount() {
    const response = await axios.get("api/v1/post/count");
    return response;
  },

  async getPlaces() {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&key=AIzaSyDksdbqnNWl73-PMGqsXxe8dD67s0G0dpY"
    );
    return response;
  },

  async getPostPreviewById(id: Post["id"]) {
    const response = await axios.get(`api/v1/post/get/preview/${id}`);

    return {
      ...response.data.post,
    };
  },
};

export default postsAPI;
