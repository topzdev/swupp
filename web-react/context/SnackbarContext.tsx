import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMemo } from "react";
import Snackbar from "../components/snackbar/Snackbar";

export type SnackbarConfig = {
  link?: string;
  show: boolean;
  type: "success" | "error" | "warning";
  image?: string;
  title: string;
  body?: string | ReactNode;
  showClose?: boolean;
  timeout?: number;
};

type SnackbarContextType = {
  setSnackbar: (config: SnackbarConfig) => void;
};

export const SnackbarContext = React.createContext<SnackbarContextType>(
  {} as SnackbarContextType
);

const SnackbarContextProvider: React.FC = ({ children }) => {
  const [_config, _setConfig] = useState<SnackbarConfig | null>(null);

  const setSnackbar = useCallback((config: SnackbarConfig) => {
    console.log("SNACKBACK_SET", config);
    _setConfig(null);
    _setConfig(config);
  }, []);

  useEffect(() => {
    return () => {
      _setConfig(null);
    };
  }, []);

  const providerValue = useMemo(() => ({ setSnackbar }), [setSnackbar]);

  return (
    <SnackbarContext.Provider value={providerValue}>
      {children}
      {_config && <Snackbar config={_config} />}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => {
  return useContext(SnackbarContext);
};

export default SnackbarContextProvider;
