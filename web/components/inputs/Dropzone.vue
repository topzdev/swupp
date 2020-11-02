<template>
  <div class="dropzone">
    <input
      class="dropzone___input"
      type="file"
      @change="onUploadPhotos($event)"
      multiple
      accept="image/*"
    />

    <div class="dropzone__thumbnails">
      <dropzone-thumbnail
        v-for="(item, idx) in value"
        :key="idx"
        :index="idx"
        :item="item"
        :remove="remove"
        :change-caption="changeCaption"
        :is-cover="isCover"
      />
    </div>
  </div>
</template>

<script>
import DropzoneThumbnail from "./dropzone/DropzoneThumbnail";
import { v4 as uuidv4 } from "uuid";
export default {
  components: { DropzoneThumbnail },
  props: {
    value: Array,
  },

  methods: {
    async onUploadPhotos(event) {
      const rawPhotos = event.target.files;
      if (!rawPhotos.length && !rawPhotos) return;
      let parsedPhotos = [];
      let self = this;
      rawPhotos.forEach((item) => {
        parsedPhotos.push({
          photo: item,
          caption: "",
          isCover: false,
        });
      });

      this.$emit("input", [...this.value, ...parsedPhotos]);
    },

    remove(index) {
      this.$emit(
        "input",
        this.value.filter((_, idx) => idx !== index)
      );
    },

    changeCaption(index, value) {
      this.$emit(
        "input",
        this.value.map((item, idx) =>
          idx === index ? { ...item, caption: value } : item
        )
      );
    },

    isCover(index) {
      let temp = this.value;

      // false all isCover on list
      temp = temp.map((item) => ({ ...item, isCover: false }));

      // assigned isCover to list using the idx as id
      temp = temp.map((item, idx) =>
        idx === index ? { ...item, isCover: true } : item
      );
      this.$emit("input", temp);
    },
  },
};
</script>

<style>
</style>