import axios from "@/configs/axiosConfig";

export type LoginCredentials = {
  usernameOrEmail: string;
  password: string;
};

export const dummyUser: User = {
  id: 10,
  recoveryEmail: null,
  phoneNumber: "09286665903",
  isActive: true,
  confirmed: true,
  createdAt: "2021-09-28T14:10:47.685Z",
  updatedAt: "2021-09-30T08:15:15.705Z",
  profile: {
    firstname: "Christian",
    lastname: "Lugod",
    coverPhoto: {
      url: null,
      securedUrl:
        "https://res.cloudinary.com/topzdev/image/upload/f_auto,q_auto/v1/swupp-dev/covers/pxzeixmmifqteufmeupn",
      publicId: null,
    },
    profilePhoto: {
      url: null,
      securedUrl:
        "https://res.cloudinary.com/topzdev/image/upload/c_scale,f_auto,q_auto,w_300/v1/swupp-dev/profiles/mb4y1bqqy6tg1japlol7",
      publicId: null,
    },
  },
};

const authAPI = {
  async login(crendentials: LoginCredentials) {
    const response = await axios.post("api/v1/auth/sign-in", crendentials);
    return response.data;
  },

  async signInV2(crendentials: LoginCredentials) {
    const response = await axios.post("api/v1/auth/sign-in-v2", crendentials);
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
    return response.data;
  },

  async isUserExist(value: any): Promise<boolean> {
    const response = await axios.get("api/v1/user/is-exist/" + value);
    return response.data;
  },

  async register(input: any) {
    const response = await axios.post("api/v1/auth/sign-up", input);
    return response.data;
  },

  async confirmation(token: any) {
    const response = await axios.post(`api/v1/auth/confirmation/${token}`);
    return response.data;
  },
};

export default authAPI;
