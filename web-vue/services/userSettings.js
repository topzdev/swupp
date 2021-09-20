import apiClient from "./axiosClient";

export default {
  async getGenralInfo() {
    const response = await apiClient.$get("api/v1/user/get-general-info");
    console.log(response);
    return response;
  },

  async updateAccountInfo({ firstname, lastname, birthdate }) {
    const response = await apiClient.$put("api/v1/user/change-info", {
      firstname,
      lastname,
      birthdate
    });

    console.log(response);

    return response;
  },

  async updatePassword({ currentPassword, newPassword, confirmPassword }) {
    const response = await apiClient.$put("api/v1/user/change-password", {
      currentPassword,
      newPassword,
      confirmPassword
    });

    console.log(response);

    return response;
  },

  async updateUsername({ username }) {
    const response = await apiClient.$put("api/v1/user/change-username", {
      username
    });

    return response;
  },

  async updateEmail({ email }) {
    const response = await apiClient.$put("api/v1/user/change-email", {
      email
    });

    return response;
  },

  async deactivate() {
    const response = await apiClient.$put("api/v1/user/deactivate");
    return response;
  },
  async activate() {
    const response = await apiClient.$put("api/v1/user/activate");
    return response;
  }
};
