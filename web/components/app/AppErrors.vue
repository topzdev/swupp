<template>
  <span>
    <div v-if="error === 'me-no-post'" class="error errors--no-post">
      <img
        src="@/assets/img/add-post-illustration.jpg"
        alt="create your own post "
        draggable="false"
      />

      <h1 class="heading--primary">Create your first post 🥺👉👈</h1>
      <p>
        Welcome {{ myFullname }}! This is your time to post your first barter in
        this app
      </p>
      <button-primary to="/new" size="md" label="Create post" />
    </div>
    <div v-if="error === 'user-no-post'" class="error errors--no-post">
      <img
        src="@/assets/img/add-post-illustration.jpg"
        alt="create your own post "
        draggable="false"
      />

      <h1 class="heading--primary">No post yet</h1>
      <p>Di pa ako nagpopost eh, Balik kanalang next time</p>
    </div>
    <div
      v-else-if="error === 'no-user-found'"
      class="error errors--no-post mt-5"
    >
      <img
        src="@/assets/img/user-not-found.jpg"
        alt="create your own post "
        draggable="false"
        class="mb-4"
      />

      <h1 class="heading--primary mb-1">No human found</h1>
      <p>Maybe he/she is from another planet or universe</p>
      <p style="text-align: left">
        <strong>Solution 1: </strong> try switching universe. <br />
        <strong>Solution 2: </strong> hmm maybe try changing planet server??..
        <br />
        <strong>Solution 3: </strong> create account using this username hehe
        <br />
      </p>
      <button-primary
        v-if="!loggedIn"
        to="/register"
        size="md"
        label="Create Account"
      />
    </div>
  </span>
</template>

<script>
import authMixin from "@/mixins/auth";
export default {
  mixins: [authMixin],
  props: {
    error: String,
  },
};
</script>

<style>
</style>