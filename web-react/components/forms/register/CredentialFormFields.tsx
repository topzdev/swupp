import React from "react";
import { useForm } from "react-hook-form";
import {
  CredentialsFieldType,
  useRegisterContext,
} from "../../../context/RegisterContext";
import TextField from "../../inputs/TextField";

interface CredentialFormFieldsProps {}

const CredentialFormFields: React.FC<CredentialFormFieldsProps> = ({}) => {
  const { credentials } = useRegisterContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CredentialsFieldType>({
    defaultValues: credentials,
  });

  return (
    <div className="card--form__body mb-2">
      <div className="row">
        <div className="col-12 mb-2">
          <TextField
            {...register("username", { required: "Username is required" })}
            label="Username"
            required
            error={errors.username?.message}
          />
        </div>
        <div className="col-12 mb-2">
          <TextField
            {...register("password", { required: "Password is required" })}
            label="Passsword"
            required
            error={errors.password?.message}
          />
        </div>
        <div className="col-12 mb-2">
          <TextField
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            label="Confirm Passsword"
            required
            error={errors.confirmPassword?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default CredentialFormFields;
