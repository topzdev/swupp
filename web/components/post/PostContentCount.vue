<template>
  <div class="post-content-count">
    <ul>
      <li>
        <app-icon :path="icons.views" />
        <span> {{ plural(count.views, "View") }} </span>
      </li>
      <li>
        <app-icon :path="icons.likes" />
        <span> {{ plural(count.likes, "Like") }} </span>
      </li>
      <li>
        <app-icon :path="icons.offer" />
        <span> {{ plural(count.offers, "Offer") }} </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mdiFacebookMessenger, mdiHeartOutline, mdiEyeOutline } from "@mdi/js";
export default {
  props: {
    count: Object,
  },
  data() {
    return {
      icons: {
        offer: mdiFacebookMessenger,
        views: mdiEyeOutline,
        likes: mdiHeartOutline,
      },
    };
  },

  methods: {
    plural(count, word) {
      return `${count ? count : 0} ${count >= 2 ? word + "s" : word}`;
    },
  },
};
</script>

<style>
</style>