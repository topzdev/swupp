<template>
  <div class="post-content-count">
    <ul>
      <li>
        <app-icon :path="icons.views" />
        <span> {{ count.views }} Views </span>
      </li>
      <li>
        <app-icon :path="icons.likes" />
        <span> {{ count.likes }} Likes </span>
      </li>
      <li>
        <app-icon :path="icons.offer" />
        <span> {{ count.offers }} Views </span>
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
};
</script>

<style>
</style>