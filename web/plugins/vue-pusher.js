import Vue from "vue";

Vue.use(require("vue-pusher"), {
  logToConsole: true,
  api_key: process.env.PUSHER_KEY,
  options: {
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true
  }
});
