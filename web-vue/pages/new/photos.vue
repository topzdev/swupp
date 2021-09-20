<template>
  <AuthLayout title="Create Post">
    <div class="container">
      <div class="new-post mb-5">
        <create-post-photo-form />
      </div>
    </div>
  </AuthLayout>
</template>

<script>
export default {
  middleware: "auth",
};
</script>
