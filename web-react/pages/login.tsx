import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import loginStyle from "@/styles/pages/login.module.scss";
import LoginForm from "../components/forms/LoginForm";
import { ComponentWithAuth } from "../types/auth-utils";

interface LoginPageProps {}

const LoginPage: ComponentWithAuth<LoginPageProps> = ({}) => {
  return (
    <>
      <div className="abstract-bg abstract-bg--2"></div>
      <div className="container">
        <div className={loginStyle.login}>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

LoginPage.auth = false;

export default LoginPage;
