<template>
  <div class="post-photos__preview">
    <button-icon
      class="btn-exit"
      size="lg"
      fab
      :icon="icons.close"
      @click.native="goBack"
    />

    <button class="btn arrow arrow-left" @click="prev">
      <app-icon :path="icons.left"></app-icon>
    </button>

    <div class="post-photos__main">
      <img :src="active.url" alt="" draggable="false" />
    </div>

    <button class="btn arrow arrow-right" @click="next">
      <app-icon :path="icons.left"></app-icon>
    </button>

    <div v-if="caption" class="post-photos__caption">
      {{ caption }}
      <a
        class="btn text--primary"
        v-if="isCaptionLong"
        @click="readMore = !readMore"
      >
        <b> {{ readMore ? "Read less" : "Read more" }}</b>
      </a>
    </div>
  </div>
</template>

<script>
import { mdiClose, mdiChevronLeft } from "@mdi/js";
export default {
  props: {
    active: Object,

    next: Function,
    prev: Function,
  },
  data() {
    return {
      readMore: false,
      icons: { close: mdiClose, left: mdiChevronLeft },
    };
  },
  computed: {
    isCaptionLong() {
      return this.active.caption.length >= 300;
    },
    caption() {
      const caption = this.active.caption;

      if (!caption) return;

      if (this.isCaptionLong) {
        if (!this.readMore) return caption.slice(0, 300) + "...";
        else return caption;
      } else return caption;
    },
  },

  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>