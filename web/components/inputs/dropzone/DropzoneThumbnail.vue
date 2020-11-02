<template>
  <div v-if="photo" style="display: block">
    <img :src="photo" alt="" height="100" />
    <input type="checkbox" :checked="item.isCover" @change="isCover(index)" />
    <input
      type="text"
      :value="item.caption"
      @input="changeCaption(index, $event.target.value)"
      placeholder="Enter Caption"
    />

    <button @click="remove(index)">X</button>
  </div>
</template>

<script>
import parseBlobToData from "@/utils/parseBlobToData";
export default {
  data() {
    return {
      photo: null,
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

  mounted() {
    this.loadPhoto(this.item.photo);
  },
};
</script>

<style>
</style>