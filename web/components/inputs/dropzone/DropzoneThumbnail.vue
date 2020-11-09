<template>
  <div class="dropzone__thumbnail" :class="coverClass" :title="title">
    <app-image :src="item.url" />
    <input
      class="thumb-checkbox"
      type="checkbox"
      :checked="item.isCover"
      @change="changeCover(index)"
    />
    <div class="dropzone__thumbnail-action">
      <button-icon :to="goto" :icon="icons.edit" />
      <button-icon
        variant="accent"
        :icon="icons.close"
        @click.native="remove(index)"
      />
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
    crud: {
      type: String,
      default: "created",
    },
    index: Number,
    item: Object,
    remove: Function,
    changeCaption: Function,
    changeCover: Function,
  },

  computed: {
    coverClass() {
      return this.item.isCover ? "thumb-active" : "";
    },
    title() {
      return !!this.item.caption
        ? "Caption: " + this.item.caption
        : "No caption added, Click edit photos to add caption for this photo";
    },
    goto() {
      return this.crud === "create"
        ? `/new/photos#photo-${this.index}`
        : `/update/photos/${this.$route.params.id}#photo-${this.index}`;
    },
  },
};
</script>

<style>
</style>