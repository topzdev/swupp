<template>
  <div v-if="show" class="backdrop">
    <div class="dialog">
      <card rounded>
        <card-header class="mb-1">
          <h2 class="mr-auto">Change Profile photo and cover</h2>
          <button-icon :icon="icons.close" @click.native="close" />
        </card-header>
        <card-body>
          <div class="change-profile">
            <div class="profile__cover">
              <img v-if="coverPhoto" :src="coverPhoto" alt="Cover photo" />

              <div class="change-profile__floater">
                <button-icon
                  :icon="icons.camera"
                  title="Edit"
                  @click.native="$refs.coverPhoto.click()"
                />
                <button-icon
                  :icon="icons.close"
                  title="Remove"
                  @click.native="remove('cover')"
                />
              </div>
            </div>
            <input
              type="file"
              name=""
              ref="profilePhoto"
              id="profile-photo"
              hidden
              @change="onUploadPhotos($event, 'profilePhoto')"
            />
            <input
              type="file"
              name=""
              ref="coverPhoto"
              id="cover-photo"
              hidden
              @change="onUploadPhotos($event, 'coverPhoto')"
            />

            <div class="profile__body">
              <div class="profile__photo">
                <div class="profile__photo-holder">
                  <img
                    v-if="profilePhoto"
                    :src="profilePhoto"
                    alt="Profile photo"
                  />
                  <div class="change-profile__floater">
                    <button-icon
                      :icon="icons.camera"
                      title="Edit"
                      @click.native="$refs.profilePhoto.click()"
                    />
                    <button-icon
                      :icon="icons.close"
                      title="Remove"
                      @click.native="remove('profile')"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </card-body>
        <card-header class="mt-2">
          <button-primary
            label="Save"
            class="ml-auto mr-1"
            variant="primary"
            size="md"
          />
        </card-header>
      </card>
    </div>
  </div>
</template>

<script>
import { mdiCamera, mdiClose } from "@mdi/js";
import parseBlobToData from "~/utils/parseBlobToData";
import { types } from "@/store/types";
export default {
  data() {
    return {
      icons: {
        close: mdiClose,
        camera: mdiCamera,
      },
      edit: {
        profilePhoto: {
          id: null,
          url: null,
          photo: null,
          flag: null,
        },
        coverPhoto: {
          id: null,
          url: null,
          photo: null,
          flag: null,
        },
      },
    };
  },
  computed: {
    current() {
      return this.$store.state.profile.current;
    },

    profilePhoto() {
      const edit = this.edit.profilePhoto.url;
      return edit ? edit : this.current.profilePhoto.url;
    },

    coverPhoto() {
      const edit = this.edit.coverPhoto.url;
      return edit ? edit : this.current.coverPhoto.url;
    },

    show() {
      return this.$store.state.profile.modals.changePhotos;
    },
  },

  methods: {
    async onUploadPhotos(event, where) {
      if (event.target.files.length)
        this.edit[where] = {
          url: await parseBlobToData(event.target.files[0]),
          photo: null,
          flag: "update",
        };
    },
    close() {
      this.$store.commit("profile/" + types.mutations.SET_PROFILE_MODAL, false);
    },
    remove(type) {
      if (type) {
        this.edit[type + "Photo"] = {
          id: null,
          url: null,
          photo: null,
          flag: "deleted",
        };
      }
    },
  },
};
</script>

<style lang="scss">
</style>