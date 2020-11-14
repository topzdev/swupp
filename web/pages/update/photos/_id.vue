<template>
  <AuthLayout title="Update Post">
    <div class="container">
      <div class="new-post mb-5">
        <update-post-photo-form />
      </div>
    </div>
  </AuthLayout>
</template>
<script>
export default {
  middleware: "auth",
};
</script>

