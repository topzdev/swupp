<template>
  <AuthLayout title="Create Post">
    <div class="container">
      <div class="new-post">
        <create-post-form />
      </div>
    </div>
  </AuthLayout>
</template>


<script>
import AuthLayout from "@/layouts/AuthLayout";
export default {
  components: {
    AuthLayout,
  },
};
</script>

<style>
</style>