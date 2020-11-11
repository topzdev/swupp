export default {
  computed: {
    links() {
      const username = this.$route.params.username;

      if (!username) return `/`;
      return {
        profile: `/profile/${username}`,
        about: `/profile/${username}/about`,
        address: `/profile/${username}/address`
      };
    }
  }
};
