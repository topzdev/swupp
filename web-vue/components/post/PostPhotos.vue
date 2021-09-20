<template>
  <div class="post-photos">
    <div class="post-photos__blur">
      <img :src="active.url" alt="" draggable="false" />
    </div>

    <post-photos-preview :active="active" :next="next" :prev="previous" />

    <post-photos-thumbnails
      :photos="postPhotos"
      :active="active"
      :set-active="setActive"
    />
  </div>
</template>

<script>
import { SAMPLE_POST_PHOTS } from "~/constants";
export default {
  data() {
    return {
      current: 0,
      active: {
        publicId: "1",
        url:
          "https://res.cloudinary.com/topzdev/image/upload/v1610257365/swupp-dev/u_s0dfzs.jpg",
        isCover: true,
        caption:
          "I'm baby shoreditch meh helvetica gluten-free vexillologist. 8-bit marfa YOLO jianbing tbh synth, thundercats scenester enamel pin. Put a bird on it tacos before they sold out, 3 wolf moon ramps tumeric tote bag tousled heirloom air plant lomo YOLO whatever fixie vape. Franzen microdosing schlitz poke four dollar toast narwhal. Literally vape dreamcatcher PBR&B, intelligentsia adaptogen art party. Street art vaporware vegan beard",
      },
      photos: SAMPLE_POST_PHOTS,
    };
  },

  computed: {
    post() {
      return this.$store.state.preview.post;
    },
    postPhotos() {
      return this.post.photos;
    },
  },

  watch: {
    postPhotos(newValue) {
      this.initActivePhoto(newValue);
    },
  },

  methods: {
    setActive(photo) {
      const self = this;
      this.postPhotos.forEach((item, idx) => {
        if (item.publicId === photo.publicId) self.current = idx;
      });
      this.active = photo;
    },

    next() {
      if (this.current >= this.postPhotos.length - 1)
        return (this.current = this.postPhotos.length);
      this.current += 1;
      this.active = this.postPhotos[this.current];
    },

    previous() {
      if (this.current <= 0) return (this.current = 1);
      this.current -= 1;
      this.active = this.postPhotos[this.current];
    },

    initActivePhoto(photos) {
      if (this.post === null) return;
      this.active = photos[0];
    },
  },

  created() {
    this.initActivePhoto(this.postPhotos);
  },
};
</script>

<style>
</style>