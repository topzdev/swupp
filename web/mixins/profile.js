export default {
  computed: {
    links() {
      const username = this.$route.params.username;
      // if (this.loggedIn) return "/login";
      return {
        profile: `/profile/${username}`,
        about: `/profile/${username}/about`,
        address: `/profile/${username}/address`
      };
    },
    user() {
      return this.$auth.user;
    },
    loggedIn() {
      return this.$auth.loggedIn;
    },

    title() {
      if (this.loggedIn) {
        const { profile } = this.$auth.user;
        return `${profile.firstname} ${profile.lastname}`;
      }

      return "Profile";
    }
  }
};
