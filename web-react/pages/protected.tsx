import React from "react";
import { ComponentWithAuth } from "../types/auth-utils";

interface ProtectedPageProps {}

const ProtectedPage: ComponentWithAuth<ProtectedPageProps> = ({ children }) => {
  return (
    <>
      <h1>Protect Page</h1>
    </>
  );
};

ProtectedPage.auth = true;

export default ProtectedPage;
