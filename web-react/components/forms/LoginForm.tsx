import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EyeOpenIcon, EyeCloseIcon } from "../../configs/Icons";
import AppAlert from "../app/AppAlert";
import AppLink from "../app/AppLink";
import AppLogo from "../app/AppLogo";
import Button from "../buttons/Button";
import TextField from "../inputs/TextField";

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

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginCredentials> = async (credentials) => {
    const { ok, error } = await signIn("credentials", {
      password: credentials.password,
      usernameOrEmail: credentials.emailOrUsername,
    });
    console.log(credentials);

    if (error) {
      console.error(error);
    }

    if (ok) {
      console.log(ok);
    }
    console.log(credentials);

    // signIn("credentials", {
    //   password: credentials.password,
    //   usernameOrEmail: credentials.emailOrUsername,
    //   redirect: false,
    // });
    // signIn("credentials", credentials);
  };

  const onTogglePassword = useCallback(() => {
    setShowPassword((state) => !state);
  }, [setShowPassword]);

  console.log(errors, showPassword);

  return (
    <div className="card--form">
      <div className="card--form__header">
        <div className="card--form__logo">
          <AppLogo href="/" />
        </div>

        <AppAlert type="error" message="test" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card--form__body mb-1">
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
        <div className="card--form__action mb-3">
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

        <p className="text--primary mt-2 mb-3 align-center">
          <AppLink href={"/forgot-password"}>
            <a className="link" style={{ marginLeft: 5 }}>
              Forgot Password
            </a>
          </AppLink>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
