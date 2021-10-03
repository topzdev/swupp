import dayjs from "dayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import authAPI from "../../../api/auth";
import {
  useRegisterContext,
  CredentialsFieldType,
  BasicInfoFieldType,
} from "../../../context/RegisterContext";
import AppAlert from "../../app/AppAlert";
import Button from "../../buttons/Button";
import Checkbox from "../../inputs/Checkbox";
import TextField from "../../inputs/TextField";

interface BasicInfoFormFieldsProps {}

const BasicInfoFormFields: React.FC<BasicInfoFormFieldsProps> = ({}) => {
  const { basicInfo, onSubmitBasicInfo, onBackStep } = useRegisterContext();

  const [_error, setError] = useState({
    message: "",
    show: false,
    type: "error",
  });

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isValidating },
  } = useForm<BasicInfoFieldType>({
    defaultValues: basicInfo,
  });

  const onSubmit = handleSubmit(async (value) => {
    try {
      await onSubmitBasicInfo(value);
    } catch (e) {
      setError({
        message: "Something went wrong",
        show: true,
        type: "error",
      });
    }
  });

  console.log(errors);

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        {_error.show && (
          <div className="col-12 mb-1">
            <AppAlert
              type={_error.type}
              message={_error.message}
              show={_error.show}
            />
          </div>
        )}
        <div className="col-12 mb-1">
          <TextField
            {...register("firstname", { required: "Username is required" })}
            label="First Name"
            required
            error={errors.firstname?.message}
          />
        </div>
        <div className="col-12 mb-1">
          <TextField
            {...register("lastname", { required: "Last Name is required" })}
            label="Last Name"
            required
            error={errors.lastname?.message}
          />
        </div>

        <div className="col-12 mb-1">
          <TextField
            {...register("birthdate", {
              required: "Birthdate is required",
              validate: (value) =>
                dayjs(Date.now()).diff(value, "year") > 18 ||
                "Sorry but you should be atleast 18 years old above before we can accept you",
            })}
            type="date"
            label="Birth Date"
            required
            error={errors.birthdate?.message}
          />
        </div>
        <div className="col-12 mt-1 mb-3">
          <Checkbox
            {...register("agree", {
              required: "The field is required",
            })}
            label={
              <>
                I agree to the{" "}
                <a target="_blank" href="/terms-and-agreement">
                  Terms
                </a>{" "}
                and{" "}
                <a target="_blank" href="/privacy-policy">
                  Privacy Policy
                </a>
              </>
            }
            error={errors.agree?.message}
          />
        </div>
        <div className="col-12">
          <Button
            type="submit"
            loading={isSubmitting || isValidating}
            size="large"
            block
          >
            Submit
          </Button>
        </div>
        <div className="col-12 mt-2">
          <Button
            type="button"
            color="secondary"
            block
            pressed
            onClick={onBackStep}
          >
            Back
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BasicInfoFormFields;
