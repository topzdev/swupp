// import { CoverPhoto, ProfilePhoto, User, UserProfile } from "../global";
import axios from "@/configs/axiosConfig";

export type GetProfileReturn = UserProfile & {
  user: {
    username: User["username"];
  };
  postCount: number;
  coverPhoto: CoverPhoto;
  profilePhoto: ProfilePhoto;
};

type ProfilePhotoParams = {
  id: number;
  publicId: string;
  photo?: any;
};

type ProfilePhotoRemoveParams = {
  id: number;
  publicId: string;
};

type ProfilePost = Post & {
  user: Pick<User, "username" | "id">;
  coverPhoto: PostPhoto;
  counts: PostCount;
};

type GetProfilePostReturn = {
  count: number;
  cursor: null;
  hasNext: boolean;
  items: ProfilePost[];
};

type ProfileAbout = Pick<
  UserProfile,
  | "birthdate"
  | "lastname"
  | "fbUrl"
  | "instaUrl"
  | "twitterUrl"
  | "websiteUrl"
  | "firstname"
> &
  DataTimestamp &
  Pick<User, "email" | "phoneNumber" | "username" | "id"> & {
    profilePhotoId: number;
    coverPhotoId: number;
    userId: User["id"];
  };

type GetProfileAboutReturn = {
  overview: Pick<
    ProfileAbout,
    "email" | "phoneNumber" | "username" | "birthdate"
  >;
  socials: Pick<
    ProfileAbout,
    "fbUrl" | "instaUrl" | "websiteUrl" | "twitterUrl"
  >;
};

const profileAPI = {
  async getProfile(username: string): Promise<GetProfileReturn> {
    const response = await axios.get("/api/v1/profile/get/" + username);

    return response.data;
  },
  async getProfileAbout(username: string): Promise<GetProfileAboutReturn> {
    const response = await axios.get("/api/v1/profile/get/about/" + username);

    const {
      fbUrl,
      instaUrl,
      websiteUrl,
      twitterUrl,
      birthdate,
      email,
      phoneNumber,
    } = response.data as ProfileAbout;

    const about = {
      overview: {
        email,
        phoneNumber,
        username,
        birthdate,
      },
      socials: {
        fbUrl,
        instaUrl,
        websiteUrl,
        twitterUrl,
      },
    };

    return about;
  },

  async getProfilePost(username: string): Promise<GetProfilePostReturn> {
    const response = await axios.get("/api/v1/profile/get/post/" + username);

    return response.data;
  },

  async updateProfilePhoto({ id, publicId, photo }: ProfilePhotoParams) {
    console.log("API", id, publicId, photo);
    const formData = new FormData();

    formData.append("id", id.toString());
    formData.append("publicId", publicId);
    formData.append("photo", photo);

    const data = await axios.put(
      "/api/v1/profile/update/profile-photo",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );

    console.log(data);

    return data.data;
  },
  async updateCoverPhoto({ id, publicId, photo }: ProfilePhotoParams) {
    console.log("API", id, publicId, photo);
    const formData = new FormData();

    formData.append("id", id.toString());
    formData.append("publicId", publicId);
    formData.append("photo", photo);

    const data = await axios.put(
      "/api/v1/profile/update/cover-photo",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(data);

    return data.data;
  },
  async removeProfilePhoto({ id, publicId }: ProfilePhotoRemoveParams) {
    const data = await axios.put("api/v1/profile/remove/profile-photo", {
      id,
      publicId,
    });

    return data.data;
  },
  async removeCoverPhoto({ id, publicId }: ProfilePhotoRemoveParams) {
    const data = await axios.put("api/v1/profile/remove/cover-photo", {
      id,
      publicId,
    });

    return data.data;
  },
};

export default profileAPI;
