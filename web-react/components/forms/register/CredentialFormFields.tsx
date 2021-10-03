import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  CredentialsFieldType,
  useRegisterContext,
} from "../../../context/RegisterContext";
import { isContaining, isUsernameExist } from "../../../utils/formValidations";
import AppAlert from "../../app/AppAlert";
import Button from "../../buttons/Button";
import TextField from "../../inputs/TextField";

interface CredentialFormFieldsProps {}

const CredentialFormFields: React.FC<CredentialFormFieldsProps> = ({}) => {
  const { credentials, onSubmitCrendential } = useRegisterContext();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValidating },
  } = useForm<CredentialsFieldType>({
    defaultValues: credentials,
  });

  const password = useRef({});
  password.current = watch("password");

  const username = useRef({});
  username.current = watch("username");

  const onSubmit = handleSubmit((data) => {
    onSubmitCrendential(data);
  });

  console.log(password, username);

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-12 mb-1">
          <TextField
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username is too short, min is 6 character",
              },
              maxLength: {
                value: 16,
                message: "Username is too long, min is 15 character",
              },
              validate: {
                noWhiteSpace: (value) =>
                  !/\s/.test(value) || "Username cannot have whitespace",
                usernameExist: async (value) =>
                  !(await isUsernameExist(value)) ||
                  "Username is already exist",
              },
            })}
            name="username"
            label="Username"
            required
            error={errors.username?.message}
          />
        </div>
        <div className="col-12 mb-1">
          <TextField
            {...register("email", {
              required: "Email Address is required",
              validate: {
                usernameExist: async (value) =>
                  !(await isUsernameExist(value)) ||
                  "Email Address is already exist",
              },
            })}
            type="email"
            label="Email Address"
            required
            error={errors.email?.message}
          />
        </div>
        <div className="col-12 mb-1">
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password is too short, min is 8 character",
              },
              maxLength: {
                value: 129,
                message: "password is to long, the maximum is 128",
              },
              validate: {
                isContaining: (value) =>
                  !isContaining(
                    value,
                    typeof username.current === "string" ? username.current : ""
                  ) || "Your password is containing your username",
              },
            })}
            label="Passsword"
            name="password"
            autoComplete={"false"}
            autoCorrect={"false"}
            required
            error={errors.password?.message}
          />
        </div>
        <div className="col-12 mb-2">
          <TextField
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: {
                isPasswordMatch: (value) =>
                  value === password.current || "The password do not match",
              },
            })}
            label="Confirm Passsword"
            name="confirmPassword"
            autoComplete={"false"}
            autoCorrect={"false"}
            required
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="col-12">
          <Button size="large" loading={isSubmitting || isValidating} block>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CredentialFormFields;
