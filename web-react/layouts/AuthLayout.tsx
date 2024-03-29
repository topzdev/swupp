import React from "react";
import AppBar from "../components/navigation/AppBar";
import { useSession } from "@next-auth/react-query";

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <AppBar />
      </header>

      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
