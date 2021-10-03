import React from "react";
import Button from "../../buttons/Button";

interface ConfirmationFormFieldsProps {}

const ConfirmationFormFields: React.FC<ConfirmationFormFieldsProps> = ({}) => {
  return (
    <div className="align-center flex-center">
      <div className="row">
        <div className="col-12">
          <h2>We sent you an email confirmation</h2>
          <p className="mt-1">
            To continue this registration please check your email for
            confirmation. After the confirmation click the button below to
            login.
          </p>
        </div>
        <div className="col-12 mt-2">
          <Button size="large" href="/login">
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationFormFields;
