<template>
  <validation-provider
    :mode="mode"
    :rules="rules"
    :vid="id"
    v-slot="{ errors }"
  >
    <div class="inp inp--primary" :class="{ 'is-error': !!errors[0] }">
      <label :for="id" class="inp__label">{{ label ? label : "&nbsp;" }}</label>
      <div class="inp__field">
        <select
          :value="value"
          @input="$emit('input', $event.target.value)"
          :id="id"
        >
          <option
            v-for="item in options"
            :key="item.id"
            :value="itemValue ? item[itemValue] : item"
          >
            {{ itemValue ? item[itemText] : item }}
          </option>
        </select>
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

export default {
  components: { ValidationProvider },
  props: {
    value: [String, Number],
    name: String,

    label: String,
    type: String,
    id: String,
    tip: String,
    options: Array,
    placeholder: {
      type: String,
    },
    itemValue: String,
    itemText: String,
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
};
</script>

<style>
</style>