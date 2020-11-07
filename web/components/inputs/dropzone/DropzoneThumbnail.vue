<template>
  <div class="dropzone__thumbnail" :class="coverClass" :title="title">
    <app-image :src="item.photoUrl" />
    <input
      class="thumb-checkbox"
      type="checkbox"
      :checked="item.isCover"
      @change="isCover(index)"
    />
    <div class="dropzone__thumbnail-action">
      <button-icon :icon="icons.edit" />
      <button-icon :icon="icons.close" @click="remove(index)" />
    </div>
  </div>
</template>

<script>
import parseBlobToData from "@/utils/parseBlobToData";
import { mdiClose, mdiImageEdit } from "@mdi/js";
export default {
  data() {
    return {
      icons: { close: mdiClose, edit: mdiImageEdit },
    };
  },

  props: {
    index: Number,
    item: Object,
    remove: Function,
    changeCaption: Function,
    isCover: Function,
  },

  computed: {
    coverClass() {
      return this.item.isCover ? "thumb-active" : "";
    },
    title() {
      return !!this.item.caption
        ? this.item.caption
        : "No caption added, Click edit photos to add caption for this photo";
    },
  },
};
</script>

<style>
</style>