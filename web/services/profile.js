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

  async getProfilePost(params) {
    console.log(params);
    const data = await apiClient.$get(
      "/api/v1/profile/get/post/" + params.username
    );

    return data;
  }
};
