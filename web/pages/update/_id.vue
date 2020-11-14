<template>
  <AuthLayout title="Create Post">
    <div class="container">
      <div class="new-post mb-5">
        <update-post-form />
      </div>
    </div>
  </AuthLayout>
</template>


<script>
import AuthLayout from "@/components/layouts/AuthLayout";
export default {
  middleware: "auth",
  components: {
    AuthLayout,
  },
};
</script>

<style>
</style>