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
                v-model="fields.firstname"
                :rules="rules.firstname"
                label="First Name"
                id="firstname"
                name="firstname"
              ></input-field>
            </div>
            <div class="col-8 mt-2">
              <input-field
                v-model="fields.lastname"
                :rules="rules.lastname"
                label="Last Name"
                id="lastname"
                name="lastname"
              ></input-field>
            </div>
            <div class="col-8 mb-1">
              <div class="row">
                <div class="col-5 mt-2">
                  <select-field
                    v-model="fields.bdMonth"
                    :rules="rules.bdMonth"
                    :options="options.months"
                    placeholder="Select Month"
                    id="bd-month"
                    label="Birth Date"
                    :show-err-mes="false"
                  ></select-field>
                </div>
                <div class="col-3 mt-2">
                  <select-field
                    v-model="fields.bdDay"
                    :rules="rules.bdDay"
                    id="bd-day"
                    placeholder="Select Day"
                    :options="options.days"
                    :show-err-mes="false"
                  ></select-field>
                </div>
                <div class="col-4 mt-2">
                  <select-field
                    v-model="fields.bdYear"
                    :rules="rules.bdYear"
                    placeholder="Select Year"
                    :options="options.years"
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
import { types } from "@/store/types";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import userSettingsServices from "@/services/userSettings";
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
      alert: {
        show: false,
        message: "",
      },
      fields: {
        firstname: "",
        lastname: "",
        bdDay: "",
        bdMonth: "",
        bdYear: "",
      },
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
  },
  watch: {
    show() {
      let parse = JSON.parse(JSON.stringify(this.general.profile));
      const parseDate = this.parseDate(parse.birthdate);
      this.fields = {
        firstname: parse.firstname,
        lastname: parse.lastname,
        bdDay: parseDate.day,
        bdMonth: parseDate.month,
        bdYear: parseDate.year,
      };
    },
  },
  methods: {
    parseDate(bdate) {
      console.log("Original", bdate);
      const birth = new Date(bdate);
      return {
        day: birth.getDate(),
        month: MONTHS[birth.getMonth()],
        year: birth.getFullYear(),
      };
    },

    async onSubmit() {
      const self = this;
      const { bdMonth, bdDay, bdYear } = this.fields;
      console.log(
        bdMonth,
        bdDay,
        bdYear,
        "Formated:" +
          dayjs(`${bdMonth} ${bdDay}, ${bdYear}`).format("YYYY-MM-DD")
      );

      const birthdate = dayjs(`${bdMonth}/${bdDay}/${bdYear}`).format(
        "YYYY-MM-DD"
      );
      const age = dayjs(Date.now()).diff(birthdate, "year");
      if (age < 18) {
        return this.$store.dispatch(types.actions.SHOW_DIALOG, {
          title: "Age Restriction",
          message:
            "Sorry but you should be atleast 18 years old above before we can accept you",
          yesLabel: "Okay",
          yesFunction: async () => {},
        });
      }

      this.$store.dispatch(types.actions.SHOW_AUTH_MODAL, {
        show: true,

        submitFunction: async function () {
          self.disabled = true;
          try {
            const data = {
              ...self.fields,
              birthdate: dayjs(`${bdMonth} ${bdDay}, ${bdYear}`).format(
                "YYYY-MM-DD"
              ),
            };
            const response = await userSettingsServices.updateAccountInfo(data);

            self.alert = {
              show: true,
              message: "Account information updated",
              type: "success",
              timeout: 3000,
            };

            self.$store.commit(
              "userSettings/" + types.mutations.SET_GENERAL_INFO,
              { ...self.general, profile: data }
            );

            self.show = false;
            self.disabled = false;
          } catch (error) {
            console.log(error);
            if (error.response && error.response.data)
              self.alert = {
                show: true,
                message: error.response.data.error.message,
                type: "error",
              };
          }
        },
      });
    },
  },
};
</script>

<style>
</style>