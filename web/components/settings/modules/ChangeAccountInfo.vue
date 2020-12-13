<template>
  <div class="content" :class="{ 'content-show': show }">
    <div class="content__header">
      <div class="content__body">
        <app-alert :alert.sync="alert" />
        <h2 class="heading">Change Account Information</h2>
        <p class="paragraph">Update your exisisting account Information.</p>
      </div>

      <div class="content__action">
        <button-primary
          v-if="!show"
          size="sm"
          label="Edit"
          @click.native="show = true"
        />
      </div>
    </div>

    <div v-if="show" class="content__main">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div class="row">
            <div class="col-8">
              <input-field
                :value="account.firstname"
                @input="onChange('firstname', $event)"
                label="First Name"
                id="firstname"
                name="firstname"
              ></input-field>
            </div>
            <div class="col-8 mt-2">
              <input-field
                :value="account.lastname"
                @input="onChange('lastname', $event)"
                label="Last Name"
                id="firstname"
                name="firstname"
              ></input-field>
            </div>
            <div class="col-8 mb-1">
              <div class="row">
                <div class="col-5 mt-2">
                  <select-field
                    :value="birthdate.month"
                    @input="changeDate('month', $event)"
                    placeholder="Select Month"
                    :options="options.months"
                    :rules="rules.bdMonth"
                    id="bd-month"
                    label="Birth Date"
                    :show-err-mes="false"
                  ></select-field>
                </div>
                <div class="col-3 mt-2">
                  <select-field
                    :rules="rules.bdDay"
                    :value="birthdate.day"
                    @input="changeDate('day', parseInt($event))"
                    id="bd-day"
                    placeholder="Select Day"
                    :options="options.days"
                    :show-err-mes="false"
                  ></select-field>
                </div>
                <div class="col-4 mt-2">
                  <select-field
                    :value="birthdate.year"
                    @input="changeDate('year', parseInt($event))"
                    placeholder="Select Year"
                    :options="options.years"
                    :rules="rules.bdMonth"
                    id="bd-year"
                    :show-err-mes="false"
                  ></select-field>
                </div>
              </div>
            </div>
            <div class="col-8 mt-2 d-flex">
              <button-primary
                class="btn--flat"
                color="light-gray"
                label="Close"
                @click.native="show = false"
                name="login"
                size="md"
              />
              <button-primary
                :disabled="disabled"
                class="ml-auto"
                label="Update"
                type="submit"
                name="login"
                size="md"
              />
            </div>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { types } from "@/store/types";
import { CURRENT_DATE, DAYS, MONTHS, YEARS } from "@/constants";
import dayjs from "dayjs";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      show: false,
      disabled: false,
      alert: {},
      bdate: {},
      rules: {
        firstname: "required",
        lastname: "required",
        bdDay: "required",
        bdMonth: "required",
        bdYear: "required",
      },
      options: {
        months: MONTHS,
        days: DAYS,
        years: YEARS,
      },
    };
  },

  computed: {
    general() {
      return this.$store.state.userSettings.general;
    },
    account() {
      return this.general.profile;
    },

    birthdate() {
      const birth = dayjs(this.account.birthdate);
      console.log(MONTHS[birth.month()], birth.day(), birth.year());
      return {
        day: birth.day(),
        month: MONTHS[birth.month()],
        year: birth.year(),
      };
    },
  },

  methods: {
    changeDate(key, value) {
      let date = { ...this.birthdate };
      date[key] = value;
      console.log("Your birthdate", date, "Key", key, "value", value);
      this.onChange(
        "birthdate",
        dayjs(`${date.month}/${date.day}/${date.year}`).format("YYYY-MM-DD")
      );
    },
    onChange(key, value) {
      console.log("On Change", key, value);
      this.$store.commit("userSettings/" + types.mutations.SET_GENERAL_INFO, {
        ...this.general,
        profile: { ...this.account, [key]: value },
      });
    },
    async onSubmit() {
      await this.$store.dispatch(
        "userSettings/" + types.actions.CHANGE_ACOUNT_INFO
      );
    },
  },
};
</script>

<style>
</style>