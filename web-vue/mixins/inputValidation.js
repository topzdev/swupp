export default {
  props: {
    id: String,
    rules: String,
    mode: {
      type: String,
      default: "eager"
    },
    showErrMes: {
      type: Boolean,
      default: true
    }
  }
};
