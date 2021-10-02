import React from "react";
import RegisterForm from "../components/forms/RegisterForm";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  return (
    <div>
      <div className="abstract-bg abstract-bg--1"></div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="register__intro">
              <h1>Sign Up to Swupp</h1>
              <p>Easy barter, Easy life</p>
            </div>
          </div>
          <div className="col-6">
            <div className="register__form">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
