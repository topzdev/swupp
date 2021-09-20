<template>
  <div class="post-photos__thumbnails">
    <ul>
      <li
        v-for="item in photos"
        :key="item.publicId"
        :class="[item.publicId === active.publicId ? 'active' : '']"
        @click="setActive(item)"
      >
        <img :src="item.url" alt="" draggable="false" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    active: Object,
    photos: Array,
    setActive: Function,
  },
};
</script>

<style>
</style>