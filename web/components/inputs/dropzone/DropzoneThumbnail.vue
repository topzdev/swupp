<template>
  <div style="display: block">
    <img v-if="photo" :src="photo" alt="" height="100" />
    <input type="checkbox" :checked="item.isCover" @change="isCover(id)" />
    <input
      type="text"
      :value="item.caption"
      @input="changeCaption(id, $event.target.value)"
      placeholder="Enter Caption"
    />

    <button @click="remove(id)">X = id = {{ id }}</button>
  </div>
</template>

<script>
import parseBlobToData from "@/utils/parseBlobToData";
export default {
  props: {
    id: String,
    item: Object,
    remove: Function,
    changeCaption: Function,
    isCover: Function,
  },
  data() {
    return {
      photo: null,
    };
  },

  async mounted() {
    this.photo = await parseBlobToData(this.item.photo);
    console.log("Components id", this.id);
  },
};
</script>

<style>
</style>