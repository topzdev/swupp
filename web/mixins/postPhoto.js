export default {
  methods: {
    isCover(index) {
      let temp = this.value;

      // false all isCover on list
      temp = temp.map(item => ({ ...item, isCover: false }));

      // assigned isCover to list using the idx as id
      temp = temp.map((item, idx) =>
        idx === index ? { ...item, isCover: true } : item
      );
      this.$emit("input", temp);
    },
    remove(index) {
      this.$emit(
        "input",
        this.value.filter((_, idx) => idx !== index)
      );
    },

    changeCaption(index, value) {
      console.log(index, value);
      this.$emit(
        "input",
        this.value.map((item, idx) =>
          idx === index ? { ...item, caption: value } : item
        )
      );
    }
  }
};
