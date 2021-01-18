import authMixin from "./auth";
import { types } from "@/store/types";

export default {
  mixins: [authMixin],

  data() {
    return {
      loading: false
    };
  },
  methods: {
    async fetchAbout(username) {
      if (this.about && this.about.username === username) return;

      await this.$store.dispatch(
        "profile/" + types.actions.FETCH_PROFILE_ABOUT,
        {
          username
        }
      );
    },
    async fetchProfile(username) {
      if (this.profile && this.profile.username === username) return;

      await this.$store.dispatch("profile/" + types.actions.FETCH_PROFILE, {
        username
      });
    },

    async fetchPost(username) {
      if (this.posts && this.posts.username === username) return;

      await this.$store.dispatch(
        "profile/" + types.actions.FETCH_PROFILE_POSTS,
        { username }
      );
    }
  },

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
    },
    profile() {
      return this.$store.state.profile.current;
    },
    about() {
      return this.$store.state.profile.about;
    },
    posts() {
      return this.$store.state.profile.posts;
    }
  },

  watch: {
    "$route.query.refresh"(newValue, oldValue) {
      if (newValue === "1" && !(newValue === undefined)) {
        console.log("Refetching data again via query");
        const username = this.$route.params.username;
        if (typeof this.$fetch === "function" && username) {
          this.fetchPost(username);
          this.$router.push({ path: this.$route.path });
        }
      }
    }
  }
};
