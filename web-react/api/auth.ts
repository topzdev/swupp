import axios from "@/configs/axiosConfig";

export type User = {
  id: string;
  username: string;
  email: string;
  profilePhoto?: string;
  coverPhoto?: string;
  firstname: string;
  lastname: string;
};

export type LoginCredentials = {
  usernameOrEmail: string;
  password: string;
};

export const dummyUser: User = {
  id: "1",
  username: "cryptocoinclash",
  email: "cryptocoinclash@gmail.com",
  firstname: "Christian",
  lastname: "Lugod",
  profilePhoto:
    "https://res.cloudinary.com/topzdev/image/upload/c_scale,f_auto,q_auto,w_300/v1/swupp-dev/profiles/mb4y1bqqy6tg1japlol7",

  coverPhoto:
    "https://res.cloudinary.com/topzdev/image/upload/f_auto,q_auto/v1/swupp-dev/covers/pxzeixmmifqteufmeupn",
};

const authAPI = {
  async login(crendentials: LoginCredentials) {
    const response = await axios.post("api/v1/auth/sign-in", crendentials);
    return response.data;
  },

  async me() {
    const response = await axios.get("api/v1/auth/me");
    return response.data;
  },

  async transactVerify({ password }: LoginCredentials) {
    const response = await axios.post("api/v1/auth/transact-verify", {
      password,
    });
    return response;
  },

  async isUserExist(value: any) {
    const response = await axios.get("api/v1/user/is-exist/" + value);
    return response;
  },

  async register(input: any) {
    const response = await axios.post("api/v1/auth/sign-up", input);
    return response;
  },

  async confirmation(token: any) {
    const response = await axios.post(`api/v1/auth/confirmation/${token}`);
    return response;
  },
};

export default authAPI;
