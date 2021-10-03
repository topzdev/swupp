import React, { useCallback, useContext, useState } from "react";
import { useMemo } from "react";
import { useMutation } from "react-query";
import authAPI from "../api/auth";

export type CredentialsFieldType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type BasicInfoFieldType = {
  firstname: string;
  lastname: string;
  birthdate: string;
  agree: boolean;
};

type RegisterContextType = {
  credentials: CredentialsFieldType;
  setCredentials: React.Dispatch<React.SetStateAction<CredentialsFieldType>>;
  basicInfo: BasicInfoFieldType;
  setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfoFieldType>>;
  step: number;
  onSubmitCrendential: (data: CredentialsFieldType) => void;
  onSubmitBasicInfo: (data: BasicInfoFieldType) => void;
  onBackStep: () => void;
  onNextStep: () => void;
};

export const RegisterContext = React.createContext<RegisterContextType>(
  {} as RegisterContextType
);

const RegisterContextProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState(1);
  const mutation = useMutation(authAPI.register);

  const [credentials, setCredentials] = useState<CredentialsFieldType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [basicInfo, setBasicInfo] = useState<BasicInfoFieldType>({
    firstname: "",
    lastname: "",
    birthdate: "",
    agree: false,
  });

  const onNextStep = useCallback(() => {
    setStep((state) => state + 1);
  }, []);

  const onBackStep = useCallback(() => {
    setStep((state) => state - 1);
  }, []);

  const onSubmitCrendential = useCallback(
    (data: CredentialsFieldType) => {
      console.log("Credentials Passed", data);
      setCredentials(data);
      onNextStep();
    },
    [onNextStep]
  );

  const onSubmitBasicInfo = useCallback(
    async (data: BasicInfoFieldType) => {
      console.log("Basic Info Passed", data);
      await mutation.mutate({ ...data, ...credentials });

      console.log(data, credentials);

      if (mutation.isError) throw mutation.error;
      if (mutation.isSuccess) onNextStep();
    },
    [credentials, onNextStep, mutation]
  );

  const providerValue = useMemo(
    () => ({
      step,
      credentials,
      setCredentials,
      basicInfo,
      setBasicInfo,
      onSubmitCrendential,
      onSubmitBasicInfo,
      onBackStep,
      onNextStep,
    }),
    [
      step,
      credentials,
      setCredentials,
      basicInfo,
      setBasicInfo,
      onSubmitCrendential,
      onSubmitBasicInfo,
      onBackStep,
      onNextStep,
    ]
  );

  return (
    <RegisterContext.Provider value={providerValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => {
  return useContext(RegisterContext);
};

export default RegisterContextProvider;
