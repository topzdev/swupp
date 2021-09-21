import { CoverPhoto, ProfilePhoto, User, UserProfile } from "../global";
import axios from "@/configs/axiosConfig";

type GetProfileReturn = UserProfile & {
  user: {
    username: User["username"];
  };
  coverPhoto: CoverPhoto;
  profilePhoto: ProfilePhoto;
  username: User["username"];
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

const profileAPI = {
  async getProfile(params: any) {
    const data = await axios.get("/api/v1/profile/get/" + params.username);

    return { ...(data as any), username: (data as any).user.username };
  },
  async getProfileAbout(params: any) {
    const data = await axios.get(
      "/api/v1/profile/get/about/" + params.username
    );

    const {
      fbUrl,
      instaUrl,
      websiteUrl,
      twitterUrl,
      birthdate,
      email,
      phoneNumber,
      username,
    } = data as any;

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

  async getProfilePost(params: any) {
    console.log(params);
    const data = await axios.get("/api/v1/profile/get/post/" + params.username);

    return data;
  },

  async updateProfilePhoto({ id, publicId, photo }: ProfilePhotoParams) {
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
