<template>
  <div class="container">
    <div class="paper profile-about">
      <div class="row">
        <div class="col-4">
          <div class="profile-about__tabs">
            <div class="tab tab--vertical">
              <div class="tab__header">
                <h2>About</h2>
              </div>
              <ul class="tab__list">
                <li class="tab__item">
                  <nuxt-link :to="links.about" exact class="tab__link">
                    Overview
                  </nuxt-link>
                </li>
                <li class="tab__item">
                  <nuxt-link :to="links.address" class="tab__link">
                    Address
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-8">
          <div class="profile-about__content">
            <div class="profile-about__list">
              <div
                v-for="(item, idx) in items"
                :key="idx"
                class="profile-about__item"
              >
                <div class="profile-about__icon">
                  <app-icon :path="item.icon" type="mdi" />
                </div>
                <div class="profile-about__text">
                  <span class="value"> {{ item.text }}</span>

                  <span v-if="item.label" class="label">{{ item.label }}</span>
                </div>

                <div class="profile-about__action">
                  <button-icon size="md" :icon="icons.edit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mdiDotsHorizontal,
  mdiPen,
  mdiPencil,
  mdiPhone,
  mdiAt,
  mdiCakeVariant,
  mdiMapMarker,
} from "@mdi/js";
import profileMixin from "@/mixins/profile";
export default {
  mixins: [profileMixin],
  data() {
    return {
      icons: {
        more: mdiDotsHorizontal,
        edit: mdiPencil,
        phone: mdiPhone,
        email: mdiAt,
        birthday: mdiCakeVariant,
        address: mdiMapMarker,
      },

      // overview: {
      //   phoneNumber: "09286665903",
      //   email: "christianlugod05@gmail.com",
      //   address: "1320 A 48 Cp Gacia st Tondo, Manila",
      //   birthday: "May 15, 2000",
      // },
    };
  },
  computed: {
    overview() {
      return this.$store.state.profile.current.about.overview;
    },
    items() {
      console.log(this.overview.phoneNumber);
      return [
        {
          icon: this.icons.phone,
          text: this.overview.phoneNumber,
          label: "Mobile",
        },
        {
          icon: this.icons.email,
          text: this.overview.email,
        },
        {
          icon: this.icons.address,
          text: this.overview.address,
        },
        {
          icon: this.icons.birthday,
          text: this.overview.birthday,
        },
      ];
    },
  },
};
</script>

<style>
</style>