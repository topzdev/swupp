import React from "react";
import AppBar from "../components/navigation/AppBar";

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <AppBar />
      </header>

      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
