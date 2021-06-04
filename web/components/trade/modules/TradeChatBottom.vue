<template>
  <div class="trade-chat-bottom">
    <textarea
      class="inp trade-chat-bottom__input"
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="Aa"
    ></textarea>

    <button class="btn trade-chat-bottom__reply">
      <app-icon class="trade-header__icon" type="mdi" :path="icons.reply" />
    </button>
  </div>
</template>

<script>
import { mdiSend } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        reply: mdiSend,
      },
    };
  },
};
</script>

<style>
</style>