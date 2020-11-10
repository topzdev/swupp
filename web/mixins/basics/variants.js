export default {
  props: {
    variant: {
      type: String,
      default: "primary"
    }
  },

  data() {
    return {
      variants: {
        primary: "color--primary",
        accent: "color--accent",
        warning: "color--warning",
        success: "color--success",
        default: "color--default",
        light: "color--light-gray"
      }
    };
  },

  computed: {
    variantClass() {
      return this.variants[this.variant];
    }
  }
};
