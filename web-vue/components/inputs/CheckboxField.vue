<template>
  <validation-provider
    :mode="mode"
    :rules="rules"
    :vid="id"
    v-slot="{ errors }"
  >
    <div class="inp inp--checkbox" :class="{ 'is-error': !!errors[0] }">
      <div class="inp__field">
        <label :for="id" class="inp__label">
          <input
            type="checkbox"
            :id="id"
            :value="value"
            :checked="value"
            @change="$emit('input', $event.target.checked)"
            name="agreement"
          />
          <span class="checkmark"></span>
          <slot> {{ label }} </slot>
        </label>
      </div>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: { ValidationProvider },
  props: {
    value: Boolean,
    name: String,
    label: String,
    id: String,
    tip: String,
    placeholder: {
      type: String,
      // default: "Placeholder here",
    },
    rules: String,
    name: String,
    mode: {
      type: String,
      default: "eager",
    },
  },
};
</script>

<style>
</style>