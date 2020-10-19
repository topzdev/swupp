<template>
  <validation-provider
    :mode="mode"
    :rules="rules"
    :vid="id"
    v-slot="{ errors }"
  >
    <div class="inp inp--primary" :class="{ 'is-error': !!errors[0] }">
      <label v-if="!!label" :for="id" class="inp__label">{{ label }}</label>

      <div class="inp__field">
        <input
          :type="inputType"
          :name="name"
          :id="id"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('input', $event.target.value)"
        />
        <button
          v-if="visibleToggle"
          type="button"
          class="inp__pass-toggle"
          @click="toggleEye = !toggleEye"
        >
          <app-icon type="mdi" :path="toggleEye ? icons.eye : icons.eyeOff" />
        </button>
      </div>

      <p v-if="showErrMes && !!errors[0]" class="inp__error">
        {{ errors[0] }}
      </p>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mdiEye, mdiEyeOff, mdiAbTesting } from "@mdi/js";
export default {
  components: { ValidationProvider },
  data() {
    return {
      icons: {
        eye: mdiEye,
        eyeOff: mdiEyeOff,
      },
      toggleEye: false,
    };
  },

  props: {
    value: String,
    name: String,
    showToggle: {
      type: Boolean,
      default: false,
    },
    label: String,
    id: String,
    tip: String,
    placeholder: {
      type: String,
      // default: "Placeholder here",
    },
    showErrMes: {
      type: Boolean,
      default: true,
    },
    rules: String,
    name: String,
    mode: {
      type: String,
      default: "eager",
    },
  },
  computed: {
    visibleToggle() {
      return this.value.length > 0 && this.showToggle;
    },
    inputType() {
      return this.toggleEye ? "text" : "password";
    },
  },
};
</script>

<style>
</style>