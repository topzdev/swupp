<template>
  <div class="profile">
    <div class="container">
      <div class="profile__cover">
        <img src="@/assets/img/cover-1.jpg" alt="Cover photo" />

        <button-primary label="Change Cover Photo" :icon-left="icons.camera" />
      </div>

      <div class="profile__body">
        <div class="profile__photo">
          <div class="profile__photo-holder">
            <img src="@/assets/img/sample-1.jpg" alt="Profile photo" />
          </div>
          <button-icon :icon="icons.camera" />
        </div>
        <div class="profile__names">
          <h1 class="fullname">Christian Lugod</h1>
          <p class="username">@topzdev123</p>
        </div>
      </div>

      <div class="profile__footer">
        <ul class="profile__tab">
          <li class="profile__tab-item profile__tab-active">
            <nuxt-link class="profile__tab-link" to="/profile">
              <span class="profile__tab-label"> Post </span>
              <span class="profile__tab-count">12</span>
            </nuxt-link>
          </li>
          <li class="profile__tab-item">
            <nuxt-link class="profile__tab-link" to="/profile/post">
              <span class="profile__tab-label"> About </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiCamera } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        camera: mdiCamera,
      },
    };
  },
  //   middleware: "auth",
};
</script>

<style>
</style>