export const state = () => ({
  counter: 0
});

export const actions = {
  async register(_, { user }) {
    try {
      console.log(user);
      const res = await this.$axios.$post("/api/v1/auth/register", user);
      console.log(res);
      return { token: res.data };
    } catch (error) {
      console.error(error);
    }
  }
};
