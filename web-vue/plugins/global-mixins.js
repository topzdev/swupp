import Vue from "vue";
import authMixin from "../mixins/auth";

if (!Vue.__my_mixin__) {
  Vue.__my__mixin__ = true;
  Vue.mixin({ authMixin }); // Set up your mixin then
}
