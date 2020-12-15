import apiClient from "./axiosClient";

export default {
  async transactVerify({ password }) {
    console.log("Auth Service", password);
    const response = await apiClient.$post("api/v1/auth/transact-verify", {
      password
    });
    console.log(response);
    return response;
  }
};
