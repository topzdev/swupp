<template>
  <div class="dropzone" :class="[activeClass, dragClass]">
    <input
      class="dropzone__base"
      type="file"
      @change="onUploadPhotos($event)"
      multiple
      accept="image/*"
      ref="dropzone"
      @dragover="dragging = true"
      @drop="dragging = false"
      @dragleave="dragging = false"
    />
    <div class="dropzone__body">
      <h2>Drag photos or click to upload</h2>
      <p>Upload two photos here</p>
    </div>
    <app-image v-if="coverPhoto" :src="coverPhoto" />
    <div class="dropzone__uploaded">
      <dropzone-thumbnail
        v-for="(item, idx) in value.slice(0, 5)"
        :key="idx"
        :index="idx"
        :item="item"
        :remove="remove"
        :change-caption="changeCaption"
        :is-cover="isCover"
      />
    </div>
    <div v-if="hasItem" class="dropzone__edit">
      <button-primary label="Edit photos" to="/new/photos" />
    </div>
  </div>
</template>

<script>
import DropzoneThumbnail from "./dropzone/DropzoneThumbnail";
import parseBlobToData from "@/utils/parseBlobToData";
import postPhotoMixin from "@/mixins/postPhoto";
export default {
  components: { DropzoneThumbnail },
  mixins: [postPhotoMixin],
  props: {
    value: Array,
  },
  data() {
    return {
      activePhoto: null,
      dragging: false,
      parseImage: null,
      toUpload: [],
    };
  },

  computed: {
    hasItem() {
      return this.value.length;
    },
    coverPhoto() {
      return this.$store.getters.getCoverPhoto;
    },
    activeClass() {
      return this.hasItem ? "dropzone--active" : "";
    },
    dragClass() {
      return this.dragging ? "dropzone--dragging" : "";
    },
    bodyTest() {
      if (this.dragging) return "You drag it here boy";
      else return "Drag photos or click to upload";
    },
  },

  watch: {
    async parseImage(value) {
      if (!value) return;
      const { photo, photoUrl } = value;
      this.$emit("input", [
        {
          photo,
          photoUrl,
          caption: "",
          isCover: false,
        },
        ...this.value,
      ]);
    },
  },

  methods: {
    async onUploadPhotos(event) {
      const rawPhotos = event.target.files;
      const self = this;

      rawPhotos.forEach((item) => {
        const reader = new FileReader();

        reader.onload = () => {
          self.parseImage = { photoUrl: reader.result, photo: item };
        };
        reader.readAsDataURL(item);
      });

      this.$refs.dropzone.value = null;
    },
  },
};
</script>

<style>
</style>