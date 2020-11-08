export default {
  props: {
    value: Array,
    crud: {
      type: String,
      default: "create"
    }
  },
  data() {
    return { parseImage: null, toUpload: [] };
  },
  watch: {
    async parseImage(value) {
      if (!value) return;
      const { photo, url } = value;
      this.$emit("input", [
        {
          photo,
          url,
          caption: "",
          isCover: false,
          flag: "new"
        },
        ...this.value
      ]);
    }
  },
  computed: {
    coverPhoto() {
      return this.$store.getters.getCoverPhoto(this.crud);
    }
  },

  methods: {
    updateFlag(flag) {
      return flag === "new" ? "new" : "updated";
    },
    changeCover(index) {
      let self = this;
      let temp = this.value;

      // false all isCover on list
      temp = temp.map(item => ({
        ...item,
        isCover: false,
        flag: item.flag === "new" ? "new" : undefined
      }));

      // assigned isCover to list using the idx as id
      temp = temp.map((item, idx) => {
        return idx === index
          ? {
              ...item,
              isCover: true,
              flag: self.updateFlag(item.flag)
            }
          : item;
      });
      this.$emit("input", temp);
    },
    remove(index) {
      const self = this;
      if (this.crud === "update") {
        let temp = [];

        for (let i = 0; i < this.value.length; i++) {
          if (i === index) {
            if (this.value[i].flag === "new") continue;
            temp.push({ ...this.value[i], flag: "deleted" });
          } else {
            temp.push(this.value[i]);
          }
        }

        this.$emit("input", temp);
      } else {
        this.$emit(
          "input",
          this.value.filter((_, idx) => idx !== index)
        );
      }
    },

    changeCaption(index, value, key) {
      const self = this;

      this.$emit(
        "input",
        this.value.map((item, idx) =>
          idx === index
            ? {
                ...item,
                caption: value,
                flag: self.updateFlag(item.flag)
              }
            : item
        )
      );
    },
    onUploadPhotos(event) {
      const self = this;
      const rawPhotos = event.target.files;

      rawPhotos.forEach(item => {
        const reader = new FileReader();

        reader.onload = () => {
          self.parseImage = { url: reader.result, photo: item };
        };
        reader.readAsDataURL(item);
      });

      this.$refs.dropzone.value = null;
    }
  }
};
