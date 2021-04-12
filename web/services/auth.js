import apiClient from "./axiosClient";

export default {
  async transactVerify({ password }) {
    const response = await apiClient.$post("api/v1/auth/transact-verify", {
      password
    });
    return response;
  },

  async isUserExist(value) {
    const response = await apiClient.$get("api/v1/user/is-exist/" + value);
    return response;
  },

  async register(input) {
    const response = await apiClient.$post("api/v1/auth/sign-up", input);
    return response;
  },

  async confirmation(token) {
    const response = await apiClient.$post(`api/v1/auth/confirmation/${token}`);
    return response;
  }
};
