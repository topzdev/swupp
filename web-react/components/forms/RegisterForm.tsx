import React from "react";
import { useRegisterContext } from "../../context/RegisterContext";
import AppLogo from "../app/AppLogo";
import TextField from "../inputs/TextField";
import BasicInfoFormFields from "./register/BasicInfoFormFields";
import ConfirmationFormFields from "./register/ConfirmationFormFields";
import CredentialFields from "./register/CredentialFormFields";

interface RegisterFormProps {}

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const { step } = useRegisterContext();

  const renderFormField = () => {
    switch (step) {
      case 1:
        return <CredentialFields />;
      case 2:
        return <BasicInfoFormFields />;

      case 3:
        return <ConfirmationFormFields />;
      default:
        return (
          <>
            <h2>Something went wrong...</h2>{" "}
          </>
        );
    }
  };

  return (
    <div className="card--form">
      <div className="card--form__header">
        <div className="card--form__logo">
          <AppLogo href="/" />
        </div>
      </div>
      <div className="card--form__body mb-2">{renderFormField()}</div>
    </div>
  );
};

export default RegisterForm;
