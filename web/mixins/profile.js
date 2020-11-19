import authMixin from "./auth";

export default {
  mixins: [authMixin],
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

    title() {
      if (this.loggedIn) {
        const { profile } = this.$auth.user;
        return `${profile.firstname} ${profile.lastname}`;
      }

      return "Profile";
    }
  },
  watch: {
    "$route.query.refresh"(newValue, oldValue) {
      if (newValue === "1" && !(newValue === undefined)) {
        console.log("Refetching data again via query");
        if (typeof this.$fetch === "function") this.$fetch();
        this.$router.push({ path: this.$route.path });
      }
    }
  }
};
