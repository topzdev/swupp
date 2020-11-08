<template>
  <validation-provider
    :mode="mode"
    :rules="rules"
    :vid="id"
    v-slot="{ errors }"
    slim
  >
    <div class="dropzone" :class="[activeClass, dragClass, errorClass(errors)]">
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
        title="Drag photos or click to upload"
      />
      <div class="dropzone__body">
        <h2>Drag photos or click to upload</h2>
        <p v-text="subtitle"></p>
      </div>
      <app-image v-if="coverPhoto" :src="coverPhoto" />
      <div class="dropzone__uploaded">
        <template v-for="(item, idx) in value.slice(0, 5)">
          <dropzone-thumbnail
            v-if="!(item.flag === 'deleted')"
            :key="idx"
            :index="idx"
            :item="item"
            :remove="remove"
            :change-caption="changeCaption"
            :change-cover="changeCover"
          />
        </template>
      </div>
      <div v-if="hasItem" class="dropzone__edit">
        <button-primary label="Edit photos" :to="toPage" />
      </div>
    </div>
  </validation-provider>
</template>

<script>
import DropzoneThumbnail from "./dropzone/DropzoneThumbnail";
import parseBlobToData from "@/utils/parseBlobToData";
import postPhotoMixin from "@/mixins/postPhoto";
import { ValidationProvider, validate } from "vee-validate";
import inputValidationMixin from "@/mixins/inputValidation";
export default {
  components: { DropzoneThumbnail, ValidationProvider },
  mixins: [postPhotoMixin, inputValidationMixin],
  data() {
    return {
      activePhoto: null,
      dragging: false,
      subtitle: "Upload atleast two photos here",
    };
  },

  computed: {
    hasItem() {
      return this.value.length;
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
    toPage() {
      return this.crud === "update" ? "/update/photos" : "/new/photos";
    },
  },

  methods: {
    errorClass(errors) {
      console.log("Yeah errors", errors);
      this.subtitle = !!errors[0] ? errors[0] : "Upload atleast two photos.";
      return !!errors[0] ? "dropzone--error" : "";
    },
  },
};
</script>

<style>
</style>