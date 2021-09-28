import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeOpenIcon, EyeCloseIcon } from "../../configs/Icons";
import AppAlert from "../app/AppAlert";
import AppLogo from "../app/AppLogo";
import Button from "../buttons/Button";
import TextField from "../inputs/Textfield";

interface LoginFormProps {}

type LoginCredentials = {
  emailOrUsername: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({});

  const [showPassword, setShowPassword] = useState(true);

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => console.log(data);

  const onTogglePassword = () => {
    setShowPassword((state) => !state);
  };

  console.log(errors);

  return (
    <div className="card--form">
      <div className="card--form__header">
        <div className="card--form__logo">
          <AppLogo href="/" />
        </div>

        <AppAlert type="error" message="test" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card--form__body mb-2">
          <div className="row">
            <div className="col-12 mb-2">
              <TextField
                {...register("emailOrUsername", {
                  required: "Usernanme or Email address is required",
                })}
                label="Username or Email Addresss"
                required
                error={errors.emailOrUsername?.message}
              />
            </div>
            <div className="col-12 mb-1">
              <TextField
                {...register("password", {
                  required: "Password is required",
                })}
                type={showPassword ? "text" : "password"}
                iconRight={showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                iconRightFunc={onTogglePassword}
                label="Password"
                required
                error={errors.password?.message}
              />
            </div>
          </div>
        </div>
        <div className="card--form__action">
          <Button
            type="submit"
            block
            size="large"
            className="ml-auto"
            loading={isSubmitting}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
