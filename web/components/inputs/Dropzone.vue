<template>
  <div class="dropzone">
    <input
      class="dropzone___input"
      type="file"
      @change="onUploadPhotos"
      multiple
      accept="image/*"
    />

    <div class="dropzone__thumbnails">
      <dropzone-thumbnail
        v-for="(item, idx) in value"
        :key="idx"
        :id="item.id"
        :item="item"
        :remove="removePhoto"
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
          id: uuidv4(),
          photo: item,
          caption: "",
          isCover: false,
        });
      });

      this.$emit("input", [...this.value, ...parsedPhotos]);
    },

    removePhoto(id) {
      console.clear();
      console.log("Given: ", id);

      this.$emit(
        "input",
        this.value.filter((item) => {
          console.log(item.id, id, item.id === id);
          return item.id !== id;
        })
      );
    },

    changeCaption(id, value) {
      this.$emit(
        "input",
        this.value.map((item) =>
          item.id === id ? { ...item, caption: value } : item
        )
      );
    },

    isCover(id) {
      let temp = this.value;

      // false all isCover on list
      temp = temp.map((item) => ({ ...item, isCover: false }));

      // assigned isCover to list using the idx as id
      temp = temp.map((item) =>
        item.id === id ? { ...item, isCover: true } : item
      );
      this.$emit("input", temp);
    },
  },
};
</script>

<style>
</style>