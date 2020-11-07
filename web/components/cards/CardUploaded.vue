<template>
  <div class="card--uploaded" :id="'photo' + index">
    <div class="card--uploaded__photo">
      <app-image :src="item.photoUrl" />
      <button class="thumb-exit" @click="remove(index)">
        <app-icon type="mdi" :path="icons.close" />
      </button>
    </div>
    <div class="card--uploaded__input">
      <div class="row no-gutters">
        <div class="col-12 mb-1 mt-1">
          <checkbox-field
            class="mb-2"
            :value="item.isCover"
            label="Make cover photo"
            @input="isCover(index)"
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
};
</script>

<style>
</style>