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
    },

    disabled: Boolean,
    text: Boolean
  },
  data() {
    return {
      variants: {
        primary: "color--primary",
        accent: "color--accent",
        warning: "color--warning",
        default: "color--default",
        light: "color--light-gray"
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

    textClass() {
      return this.text ? "btn--text" : "";
    },

    variantClass() {
      return this.variants[this.variant];
    },

    fullWidth() {
      return this.isFullWidth ? "btn--full-width" : "";
    }
  }
};
