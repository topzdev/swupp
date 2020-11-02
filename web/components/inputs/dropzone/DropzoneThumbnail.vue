<template>
  <div v-if="photo" class="dropzone__thumbnail" :class="coverClass">
    <img class="thumb-blur" :src="photo" alt="" height="100" />
    <img class="thumb-img" :src="photo" alt="" height="100" />
    <input
      class="thumb-checkbox"
      type="checkbox"
      :checked="item.isCover"
      @change="isCover(index)"
    />
    <!-- <input
      type="text"
      :value="item.caption"
      @input="changeCaption(index, $event.target.value)"
      placeholder="Enter Caption"
    /> -->

    <button class="thumb-exit" @click="remove(index)">
      <app-icon type="mdi" :path="icons.close" />
    </button>
  </div>
</template>

<script>
import parseBlobToData from "@/utils/parseBlobToData";
import { mdiClose } from "@mdi/js";
export default {
  data() {
    return {
      photo: null,
      icons: { close: mdiClose },
    };
  },

  props: {
    index: Number,
    item: Object,
    remove: Function,
    changeCaption: Function,
    isCover: Function,
  },

  methods: {
    async loadPhoto(photo) {
      this.photo = await parseBlobToData(photo);
    },
  },

  watch: {
    item: function (newValue) {
      this.loadPhoto(newValue.photo);
    },
  },

  computed: {
    coverClass() {
      return this.item.isCover ? "thumb-active" : "";
    },
  },

  mounted() {
    this.loadPhoto(this.item.photo);
  },
};
</script>

<style>
</style>