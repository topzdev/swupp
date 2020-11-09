<template>
  <div class="card--uploaded" :id="'photo-' + index">
    <div class="card--uploaded__photo">
      <app-image :src="item.url" />
      <button-icon :icon="icons.close" @click.native="remove(index)" />
    </div>
    <div class="card--uploaded__input">
      <div class="row no-gutters">
        <div class="col-12 mb-1 mt-1">
          <checkbox-field
            :value="item.isCover"
            class="mb-2"
            label="Make cover photo"
            @input="changeCover(index)"
          ></checkbox-field>
        </div>
        <div class="col-12">
          <input-field
            :value="item.caption"
            placeholder="Add description for this photo"
            @input="changeCaption(index, $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postPhotoMixin from "@/mixins/postPhoto";
import { mdiClose } from "@mdi/js";
export default {
  data() {
    return {
      icons: { close: mdiClose },
    };
  },
  props: {
    index: Number,
    item: Object,
    value: Array,
  },
  mixins: [postPhotoMixin],
  // watch: {
  //   item(value) {
  //     console.log("Changing", value);
  //   },
  // },
};
</script>

<style>
</style>