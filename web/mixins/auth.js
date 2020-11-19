export default {
  computed: {
    user() {
      return this.$auth.user;
    },
    profile() {
      return this.user ? this.user.profile : null;
    },
    loggedIn() {
      return this.$auth.loggedIn;
    },
    profilePhoto() {
      return this.user
        ? this.$cloudinary.image.url(this.profile.profilePhoto.publicId, {
            height: 80,
            quality: "auto",
            crop: "scale"
          })
        : null;
    },
    myFullname() {
      return this.user
        ? this.user.profile.firstname + " " + this.user.profile.lastname
        : "";
    },
    profileLink() {
      return `/profile/${this.user.username}?refresh=1`;
    }
  },

  mounted() {
    console.log(this.profilePhoto);
  }
};
