<template>
  <client-only>
    <GmapMap
      :options="options"
      :center="center"
      :zoom="10.3"
      style="width: 100%; height: 100%"
    >
      <GmapCircle
        :center="center"
        :clickable="false"
        :draggable="false"
        :radius="5000"
        :options="{
          fillOpacity: 0.2,
          fillColor: '#ffa41b',
          strokeWeight: 1,
        }"
      />
      <GmapMarker :position="center" :clickable="false" :draggable="false" />
    </GmapMap>
  </client-only>
</template>

<script>
export default {
  props: {
    center: Object,
  },
  data() {
    return {
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
      },
    };
  },
};
</script>

<style>
</style>