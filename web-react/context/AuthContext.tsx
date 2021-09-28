import React, { useCallback, useContext, useState } from "react";
import { useMemo } from "react";
import authAPI, { dummyUser, LoginCredentials, User } from "../api/auth";
type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (credentials: LoginCredentials) => void;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(dummyUser);
  const [isLoggedIn] = useState(user ? true : false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await authAPI.login(credentials);
    setUser(response);
  }, []);

  const providerValue = useMemo(
    () => ({ user, login, isLoggedIn }),
    [user, login, isLoggedIn]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
