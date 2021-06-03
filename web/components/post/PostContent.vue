<template>
  <div class="post-content">
    <app-navbar variant="post"></app-navbar>

    <div class="post-content__body">
      <post-content-header :post="post" />
      <post-content-count :count="post.count" />

      <post-content-description :description="post.body" />

      <post-content-location
        v-if="post.postLocation"
        :location="post.postLocation"
      />

      <post-content-profile :profile="post.user" />
    </div>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     post: {
  //       title: "Sweet delicacies/delights? to yours?",
  //       preffered: "Food sana yung hindi cookies hahaha umay na eh",
  //       price: 125.55,
  //       count: {
  //         views: 100,
  //         likes: 42,
  //         offers: 2,
  //       },
  //       description:
  //         "This is the best chocolate chip cookie recipe ever! No funny ingredients, no chilling time, etc. Just a simple, straightforward, amazingly delicious, doughy yet still fully cooked, chocolate chip cookie that turns out perfectly every single time! ",

  //       location: {
  //         lat: 0,
  //         lng: 0,
  //       },

  //       user: {
  //         photo:
  //           "https://res.cloudinary.com/topzdev/image/upload/c_scale,f_auto,q_auto,w_300/v1/swupp-dev/profiles/fl1augwgqmfnlquxzesz",
  //         fullname: "Christian Lugod",
  //         username: "topzdev",
  //         id: 1,
  //       },
  //     },
  //   };
  // },

  computed: {
    post() {
      return this.$store.state.preview.post;
    }
  }
};
</script>

<style></style>
