import React, { useCallback, useContext, useState } from "react";
import { useMemo } from "react";

export type CredentialsFieldType = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type BasicInfoFieldType = {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  agree: boolean;
};

type RegisterContextType = {
  credentials: CredentialsFieldType;
  setCredentials: React.Dispatch<React.SetStateAction<CredentialsFieldType>>;
  basicInfo: BasicInfoFieldType;
  setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfoFieldType>>;
  onSubmitCrendential: (data: CredentialsFieldType) => void;
  onSubmitBasicInfo: (data: BasicInfoFieldType) => void;
};

export const RegisterContext = React.createContext<RegisterContextType>(
  {} as RegisterContextType
);

const RegisterContextProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState(1);

  const [credentials, setCredentials] = useState<CredentialsFieldType>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [basicInfo, setBasicInfo] = useState<BasicInfoFieldType>({
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    agree: false,
  });

  const onNextStep = useCallback(() => {
    setStep((state) => state + 1);
  }, []);

  const onBackStep = useCallback(() => {
    setStep((state) => state - 1);
  }, []);

  const onSubmitCrendential = useCallback((data: CredentialsFieldType) => {
    setCredentials(data);
    onNextStep();
  }, []);

  const onSubmitBasicInfo = useCallback((data: BasicInfoFieldType) => {
    setBasicInfo(data);
    onNextStep();
  }, []);

  const providerValue = useMemo(
    () => ({
      credentials,
      setCredentials,
      basicInfo,
      setBasicInfo,
      onSubmitCrendential,
      onSubmitBasicInfo,
    }),
    [
      credentials,
      setCredentials,
      basicInfo,
      setBasicInfo,
      onSubmitCrendential,
      onSubmitBasicInfo,
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
