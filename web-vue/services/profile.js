import apiClient from "./axiosClient";

export default {
  async getProfile(params) {
    const data = await apiClient.$get("/api/v1/profile/get/" + params.username);

    return { ...data, username: data.user.username };
  },
  async getProfileAbout(params) {
    const data = await apiClient.$get(
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
      username
    } = data;

    const about = {
      overview: {
        email,
        phoneNumber,
        username,
        birthdate
      },
      socials: {
        fbUrl,
        instaUrl,
        websiteUrl,
        twitterUrl
      }
    };

    return about;
  },

  async getProfilePost(username) {
    console.log(params);
    const data = await apiClient.$get(
      "/api/v1/profile/get/post/" + params.username
    );

    return data;
  },

  async updateProfilePhoto({ id, publicId, photo }) {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("publicId", publicId);
    formData.append("photo", photo);

    const data = await apiClient.$put(
      "/api/v1/profile/update/profile-photo",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    );

    console.log(data);

    return data.data;
  },
  async updateCoverPhoto({ id, publicId, photo }) {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("publicId", publicId);
    formData.append("photo", photo);

    const data = await apiClient.$put(
      "/api/v1/profile/update/cover-photo",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }
    );
    console.log(data);

    return data.data;
  },
  async removeProfilePhoto({ id, publicId }) {
    const data = await apiClient.$put("api/v1/profile/remove/profile-photo", {
      id,
      publicId
    });

    return data.data;
  },
  async removeCoverPhoto(params) {
    const data = await apiClient.$put("api/v1/profile/remove/cover-photo", {
      id,
      publicId
    });

    return data.data;
  }
};
