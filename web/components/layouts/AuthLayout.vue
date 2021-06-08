<template>
  <div>
    <app-connection />
    <header>
      <!-- <client-only> -->
      <app-navbar v-if="showNavbar" />
      <!-- </client-only> -->
    </header>

    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { types } from "@/store/types";
import AppNavbar from "@/components/navbars/AppNavbar";
import AuthMixin from "@/mixins/auth";
import Pusher from "pusher-js";

const channels = {
  tradeAccepted: "swupp-trade-accepted",
  tradeMessage: "swupp-trade-message",
  tradeCreated: "swupp-trade-created",
};

export default {
  mixins: [AuthMixin],
  props: {
    title: {
      type: String,
      default: "Swupp",
    },
    showNavbar: {
      type: Boolean,
      default: true,
    },
    description: String,
  },
  head() {
    return {
      title: this.title,
      titleTemplate: "%s - Swupp",
    };
  },
  data() {
    return {
      pusher: null,
    };
  },
  methods: {
    pusherSubscription() {
      const tradeCreatedChannel = this.pusher.subscribe(channels.tradeCreated);
      const page = this.$route.name;
      const self = this;
      if (this.user.id) {
        tradeCreatedChannel.bind(`user-${this.user.id}`, async function (data) {
          if (page === "trade") {
            await self.$store.dispatch(types.actions.FETCH_RECENT_CHATS);
            self.$store.commit;
          } else {
            await self.$store.dispatch(
              types.actions.SHOW_SNACKBAR,
              {
                title: "New Trade Offer Recieved",
                body: "Click this notification to view the offer",
                type: "success",
                timeout: 10000,
                link: "/trade?id=" + data.tradeId,
                showClose: true,
              },
              { root: true }
            );
            alert("Notification Recived");
          }
        });
      }
    },

    pusherUnSubscribe() {
      console.log("Unsubscribing...");
      this.pusher.unsubscribe(channels.tradeCreated);
    },
  },
  components: {
    AppNavbar,
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