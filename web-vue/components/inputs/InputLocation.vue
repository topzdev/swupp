<template>
  <validation-provider
    :mode="mode"
    :rules="rules"
    :vid="id"
    v-slot="{ errors }"
  >
    <div
      v-bind="$attrs"
      class="inp--primary inp-location"
      :class="{ 'is-error': !!errors[0] }"
    >
      <div>
        <label v-if="!!label" :for="id" class="inp__label">{{ label }}</label>
        <slot></slot>
      </div>

      <div class="inp__field">
        <div v-if="!!leftIcon" class="inp__left-icon">
          <app-icon :path="leftIcon"></app-icon>
        </div>

        <gmap-autocomplete
          @place_changed="placeChanged"
          :placeholder="placeholder"
          :value="value"
          :name="name"
          :id="id"
        >
        </gmap-autocomplete>
        <div v-if="!!rightIcon" class="inp__left-icon">
          <app-icon :path="rightIcon"></app-icon>
        </div>
      </div>

      <div v-if="!!tip" class="inp__tip">{{ tip }}</div>

      <p v-if="showErrMes && !!errors[0]" class="inp__error">
        {{ errors[0] }}
      </p>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import inputValidationMixin from "@/mixins/inputValidation";
import postServices from "@/services/posts";

export default {
  inheritAttrs: false,
  components: { ValidationProvider },
  mixins: [inputValidationMixin],

  methods: {
    placeChanged(place) {
      console.log(place);

      if (place) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.formatted_address;

        this.$emit("input", { lat, lng, name });
      }
    },
  },

  props: {
    location: Object,
    value: [String, Number],
    name: String,
    label: String,
    type: String,
    id: String,
    tip: String,
    placeholder: {
      type: String,
      // default: "Placeholder here",
    },
    leftIcon: String,
    rightIcon: String,
    name: String,
  },
};
</script>

<style>
</style>>