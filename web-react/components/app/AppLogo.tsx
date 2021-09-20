import React from "react";
import AppLink from "./AppLink";
import logoSmall from "@/assets/img/logo_x80.webp";
import logoLarge from "@/assets/img/logo_x500.webp";
import AppImage from "./AppImage";

interface AppLogoProps {
  size?: "sm" | "lg";
}

const AppLogo: React.FC<AppLogoProps> = ({ size }) => {
  let logo: any;

  switch (size) {
    case "lg":
      logo = logoLarge;
      break;

    case "sm":
      logo = logoSmall;
      break;
  }

  return (
    <AppLink href="/">
      <AppImage alt="Swupp Logo" src={logo} />
    </AppLink>
  );
};

AppLogo.defaultProps = {
  size: "lg",
};

export default AppLogo;
