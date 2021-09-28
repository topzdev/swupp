import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authAPI from "../../../api/auth";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameOrEmail: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const loginResponse = await authAPI.login(credentials);

        const token = loginResponse.token;

        if (token) {
          const meReposponse = await authAPI.me();

          const user = meReposponse.user;

          if (!user) return null;

          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
