import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authAPI from "../../../api/auth";

export default NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  providers: [
    CredentialsProvider({
      id: "sign-in-v2",
      name: "credentials",
      credentials: {
        usernameOrEmail: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const response = await authAPI.signInV2(credentials);

        if (response && response.data) {
          const token = response.token;
          const user = response.user;

          return user;
        } else {
          throw Error(response.error);
        }
      },
    }),
  ],
});
