<template>
  <div v-if="photo" style="display: block">
    <img :src="photo" alt="" height="100" />
    <input type="checkbox" :checked="item.isCover" @change="isCover(id)" />
    <input
      type="text"
      :value="item.caption"
      @input="changeCaption(id, $event.target.value)"
      placeholder="Enter Caption"
    />

    <button @click="remove(idx)">X = id = {{ id }}</button>
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
    id: String,
    idx: Number,
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
    item: async function (newValue) {
      await this.loadPhoto(newValue.photo);
    },
  },

  mounted() {
    this.loadPhoto(this.item.photo);
  },
};
</script>

<style>
</style>