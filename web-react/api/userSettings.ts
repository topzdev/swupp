import axios from "@/configs/axiosConfig";

const userSettingsAPI = {
  async getGenralInfo() {
    const response = await axios.get("api/v1/user/get-general-info");
    console.log(response);
    return response;
  },

  async updateAccountInfo({ firstname, lastname, birthdate }: any) {
    const response = await axios.put("api/v1/user/change-info", {
      firstname,
      lastname,
      birthdate,
    });

    console.log(response);

    return response;
  },

  async updatePassword({ currentPassword, newPassword, confirmPassword }: any) {
    const response = await axios.put("api/v1/user/change-password", {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    console.log(response);

    return response;
  },

  async updateUsername({ username }: any) {
    const response = await axios.put("api/v1/user/change-username", {
      username,
    });

    return response;
  },

  async updateEmail({ email }: any) {
    const response = await axios.put("api/v1/user/change-email", {
      email,
    });

    return response;
  },

  async deactivate() {
    const response = await axios.put("api/v1/user/deactivate");
    return response;
  },
  async activate() {
    const response = await axios.put("api/v1/user/activate");
    return response;
  },
};

export default userSettingsAPI;
