<template>
  <div class="trade-chat" ref="chatContainer" @scroll="handleScroll">
    <div class="trade-chat__row" v-for="message in messages" :key="message.id">
      <chat-message-card :message="message" />
    </div>
  </div>
</template>

<script>
import { types } from "@/store/types";
import debounce from "debounce";
import Pusher from "pusher-js";
import AuthMixin from "@/mixins/auth";

const channels = {
  tradeAccepted: "swupp-trade-accepted",
  tradeMessage: "swupp-trade-message",
  tradeCreated: "swupp-trade-created",
};

export default {
  mixins: [AuthMixin],
  data() {
    return {
      pusher: null,
      tradeMessagingChannel: null,
    };
  },
  computed: {
    messages() {
      return this.$store.getters[types.getters.GET_CURRENT_MESSAGE];
    },
    currentTradeId() {
      return this.$store.state.trade.current.header.id;
    },
    members() {
      return this.$store.state.trade.current.members;
    },
  },

  methods: {
    scrollToTop() {
      const chatContainer = this.$refs.chatContainer;
      if (chatContainer) {
        chatContainer.scrollTop = 0;
      }
    },
    scrollToEnd() {
      const chatContainer = this.$refs.chatContainer;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
        // console.log(this.$refs.chatContainer.scrollHeight);
      }
    },
    handleScroll: debounce(function (el) {
      if (el.target.scrollTop <= 10) {
        this.$store.dispatch(types.actions.FETCH_MORE_MESSAGES);
      }
    }, 500),

    pusherSubscription() {
      console.log("Updating..");
      const tradeMessagingChannel = this.pusher.subscribe(
        channels.tradeMessage
      );
      const accepTradeChannel = this.pusher.subscribe(channels.tradeAccepted);

      const self = this;
      if (this.currentTradeId) {
        const event = `trade-${this.currentTradeId}`;
        console.log("EVENT: ", event);
        tradeMessagingChannel.bind(event, function (data) {
          console.log("Swupp Current Message:", event, data);

          if (data) {
            self.$store.commit(types.mutations.UPDATE_TRADE_MESSAGE, {
              id: data.tempId,
              message: {
                ...data.message,
                user: self.members[data.message.userId],
              },
            });
          }
        });

        accepTradeChannel.bind(event, async function (data) {
          console.log("Trade Accepted:", event, data);
          // alert("Trade Accepted:", event, data);
          if (data) {
            await self.$store.commit(types.mutations.SET_IS_TRADED, {
              tradeId: data.tradeId,
            });
            await self.$store.dispatch(types.actions.FETCH_RECENT_CHATS);
          }
        });
      }
    },

    pusherUnSubscribe() {
      console.log("Unsubscribing...");
      this.pusher.unsubscribe(channels.tradeMessage);
      this.pusher.unsubscribe(channels.tradeAccepted);
      this.pusher.unsubscribe(channels.tradeCreated);
    },
  },

  updated() {
    this.pusherUnSubscribe();
    this.scrollToEnd();
    this.pusherSubscription();
  },

  mounted() {
    Pusher.logToConsole = true;

    this.pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_CLUSTER,
    });

    this.pusherSubscription();
  },

  destroyed() {
    this.pusherUnSubscribe();
    this.pusher = null;
  },
};
</script>

<style>
</style>