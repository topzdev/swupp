import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import loginStyle from "@/styles/pages/login.module.scss";
import LoginForm from "../components/forms/LoginForm";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
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

export default LoginPage;
