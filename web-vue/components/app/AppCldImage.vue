<template>
  <client-only>
    <cld-image
      :public-id="publicId"
      :height="height"
      :width="width"
      :quality="quality"
      :loading="loading"
      :scale="scale"
      :alt="alt"
    >
      <cld-placeholder v-if="placeholderType" :type="placeholderType" />
    </cld-image>
  </client-only>
</template>

<script>
export default {
  props: {
    publicId: String,
    height: String,
    width: String,
    quality: String,
    loading: String,
    placeholderType: String,
    alt: String,
    scale: String,
  },
};
</script>

<style>
</style>