export default {
  props: {
    size: {
      type: String,
      default: "sm"
    },
    variant: {
      type: String,
      default: "primary"
    },

    isFullWidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      variants: {
        primary: "color--primary",
        accent: "color--accent",
        default: "color--default"
      },
      sizes: {
        sm: "btn--small",
        md: "btn--medium",
        lg: "btn--large"
      }
    };
  },
  computed: {
    sizeClass() {
      return this.sizes[this.size];
    },

    variantClass() {
      return this.variants[this.variant];
    },

    fullWidth() {
      return this.isFullWidth ? "btn--full-width" : "";
    }
  }
};
