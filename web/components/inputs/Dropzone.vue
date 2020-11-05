<template>
  <div class="dropzone">
    <input
      class="dropzone__base"
      type="file"
      @change="onUploadPhotos($event)"
      multiple
      accept="image/*"
    />
    <!-- <app-image v-if="coverPhoto" :src="coverPhoto" /> -->
    <div class="dropzone__body">
      <h2>Drag photos or click to upload</h2>
      <p>
        Upload 2 or more photos here, product photo is the best way to barter
        your product
      </p>
    </div>
    <div class="dropzone__uploaded">
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
import parseBlobToData from "@/utils/parseBlobToData";
export default {
  components: { DropzoneThumbnail },
  props: {
    value: Array,
  },

  computed: {
    async coverPhoto() {
      if (!this.value) return;
      const rawPhoto = this.value.filter((item) => item.isCover === true)[0];
      const photo = this.loadPhoto(rawPhoto);
      return (
        this.loadPhoto(this.value.filter((item) => item.isCover === true)[0]) ||
        null
      );
    },
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

      this.$emit("input", [...parsedPhotos, ...this.value]);
    },
    async loadPhoto(photo) {
      return await parseBlobToData(photo);
    },
    initialActive() {
      this.$emit(
        "input",
        this.value.map((item, idx) => {
          idx === 1 ? { ...item, isActive: true } : item;
        })
      );
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