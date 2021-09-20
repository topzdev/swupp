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

const login = (crendentials: LoginCredentials) => {
  const response = dummyUser;
  return response;
};

const authAPI = {
  login,
};

export default authAPI;
