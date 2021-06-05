<template>
  <div class="trade-chat-bottom">
    <template v-if="isTraded">
      <div class="trade-traded-message">
        You can't reply to this trade becuase it's already traded
      </div>
    </template>
    <template v-else>
      <textarea
        class="inp trade-chat-bottom__input"
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Aa"
        v-model="text"
      ></textarea>

      <button class="btn trade-chat-bottom__reply" @click="addMessage">
        <app-icon class="trade-header__icon" type="mdi" :path="icons.reply" />
      </button>
    </template>
  </div>
</template>

<script>
import { mdiSend } from "@mdi/js";
import { types } from "~/store/types";
export default {
  data() {
    return {
      text: "",
      icons: {
        reply: mdiSend,
      },
    };
  },
  computed: {
    isTraded() {
      return this.$store.getters[types.getters.IS_TRADED];
    },
  },
  methods: {
    async addMessage() {
      if (this.text) {
        await this.$store.dispatch(types.actions.ADD_TRADE_MESSAGE, this.text);
        this.text = "";
      }
    },
  },
};
</script>

<style>
</style>