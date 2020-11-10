import variantMixin from "./basics/variants";
export default {
  mixins: [variantMixin],
  props: {
    size: {
      type: String,
      default: "sm"
    },

    isFullWidth: {
      type: Boolean,
      default: false
    },

    disabled: Boolean,
    text: Boolean,
    iconRight: String,
    iconLeft: String
  },
  data() {
    return {
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

    fullWidth() {
      return this.isFullWidth ? "btn--full-width" : "";
    }
  }
};
