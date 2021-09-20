<template>
  <div v-if="show" class="backdrop">
    <div class="dialog">
      <card :loading="loading" rounded>
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
            @click.native="onSave"
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
      loading: false,
      icons: {
        close: mdiClose,
        camera: mdiCamera
      },
      edit: {
        profilePhoto: {
          id: null,
          url: null,
          photo: null,
          flag: null
        },
        coverPhoto: {
          id: null,
          url: null,
          photo: null,
          flag: null
        }
      }
    };
  },
  computed: {
    current() {
      return this.$store.state.profile.current;
    },

    profilePhoto() {
      const edit = this.edit.profilePhoto.url;
      return edit
        ? edit
        : this.$cloudinary.image.url(this.current.profilePhoto.publicId, {
            width: 150,
            quality: "auto",
            crop: "scale"
          });
    },

    coverPhoto() {
      const edit = this.edit.coverPhoto.url;
      return edit
        ? edit
        : this.$cloudinary.image.url(this.current.coverPhoto.publicId, {
            height: 250,
            quality: "auto",
            crop: "scale"
          });
    },

    show() {
      return this.$store.state.profile.modals.changePhotos;
    }
  },

  methods: {
    async onSave() {
      this.loading = true;
      const coverPhoto = {
        id: this.current.coverPhoto.id,
        publicId: this.current.coverPhoto.publicId,
        photo: this.edit.coverPhoto.photo,
        flag: this.edit.coverPhoto.flag
      };
      const profilePhoto = {
        id: this.current.profilePhoto.id,
        publicId: this.current.profilePhoto.publicId,
        photo: this.edit.profilePhoto.photo,
        flag: this.edit.profilePhoto.flag
      };

      await this.$store.dispatch(
        "profile/" + types.actions.UPDATE_PROFILE_PHOTOS,
        {
          profilePhoto,
          coverPhoto
        }
      );

      this.loading = false;
    },

    async onUploadPhotos(event, where) {
      const photo = event.target.files;
      if (photo.length)
        this.edit[where] = {
          url: await parseBlobToData(photo[0]),
          photo: photo[0],
          flag: "update"
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
          flag: "deleted"
        };
      }
    }
  }
};
</script>

<style lang="scss"></style>
