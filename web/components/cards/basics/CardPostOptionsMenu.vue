<template>
  <div class="card--post__options-list">
    <ul>
      <!-- <li v-if="isMyPost" @click.stop="gotoEdit">
        <app-icon class="icons" :path="icons.edit"></app-icon> Edit
      </li> -->
      <li><app-icon class="icons" :path="icons.report"></app-icon> Report</li>
    </ul>
  </div>
</template>

<script>
import { mdiAlert, mdiPencilOutline } from "@mdi/js";
// import authMixin from "@/mixins/auth";
export default {
  //   mixins: [authMixin],
  props: {
    username: String,
    id: [String, Number],
    user: Object,
  },
  data() {
    return {
      icons: {
        report: mdiAlert,
        edit: mdiPencilOutline,
      },
    };
  },

  computed: {
    isMyPost() {
      return this.$auth.loggedIn && this.user.id === this.$auth.user.id;
    },
  },

  methods: {
    gotoEdit() {
      return this.$router.push(`/post/${this.user.username}/edit/${this.id}`);
    },
  },
};
</script>

<style>
</style>