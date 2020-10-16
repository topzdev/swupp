import { extend, setInteractionMode } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "The {_field_} field is required"
});
extend("min", {
  validate: (value, { min }) => {
    return !(value.length <= parseInt(min));
  },
  params: ["min"],
  message: "{_field_} is too short, minimum is {min} character"
});
extend("max", {
  validate: (value, { max }) => {
    return !(value.length >= parseInt(max));
  },
  params: ["max"],
  message: "{_field_} is too long, maximum is {max} character"
});
extend("no_white_space", {
  validate: value => {
    return !/\s/.test(value);
  },
  message: "{_field_} cannot have whitespace"
});
extend("alpha_num_special", {
  validate: value => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/.test(value);
  },
  message: "{_field_} should contain alphanumeric and special characters"
});
extend("is_equal_to", {
  validate: (value, { compareTo }) => {
    return value === compareTo;
  },
  params: ["compareTo", "field"],
  message: "This {_field_} didn't match with your {field} "
});
extend("email", {
  ...email
});
extend("confirm_password", {
  validate: (value, { target }) => {
    return value === target;
  },
  params: ["target"],
  message: "Password confirmation does not match"
});
