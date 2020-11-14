export default {
  computed: {
    user() {
      return this.$auth.user;
    },
    profile() {
      return this.user.profile;
    },
    loggedIn() {
      return this.$auth.loggedIn;
    },
    profilePhoto() {
      return this.user.profile.profilePhoto.url;
    },
    profileLink() {
      return `/profile/${this.user.username}`;
    }
  },

  mounted() {
    console.log(this.profilePhoto);
  }
};
