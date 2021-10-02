import React from "react";
import AppLogo from "../app/AppLogo";
import TextField from "../inputs/TextField";
import CredentialFields from "./register/CredentialFields";

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  return (
    <div className="card--form">
      <div className="card--form__header">
        <div className="card--form__logo">
          <AppLogo href="/" />
        </div>
      </div>
      <div className="card--form__body mb-2">
        <div className="row">
          <div className="col-12 mb-2">
            <CredentialFields />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
