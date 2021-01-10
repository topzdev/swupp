<template>
  <div class="post-content-profile">
    <p class="overline mb-1">Posted By</p>
    <div class="post-content-profile__body">
      <div class="post-content-profile__photo">
        <profile-photo></profile-photo>
      </div>

      <div class="post-content-profile__name">
        <p class="fullname">{{ profile.fullname }}</p>
        <p class="username">@{{ profile.username }}</p>
      </div>

      <button-primary
        :to="`/profile/${profile.username}`"
        class="ml-auto"
        size="sm"
        label="Visit Profile"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object,
  },
};
</script>

<style>
</style>