import React from "react";
import AppLink, { AppLinkProps } from "./AppLink";
import logoSmall from "@/assets/img/logo_x80.webp";
import logoLarge from "@/assets/img/logo_x500.webp";
import AppImage from "./AppImage";

type AppLogoProps = {
  size?: "sm" | "lg";
} & AppLinkProps;

const AppLogo: React.FC<AppLogoProps> = ({ size, ...rest }) => {
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
    <AppLink {...rest}>
      <AppImage alt="Swupp Logo" src={logo} />
    </AppLink>
  );
};

AppLogo.defaultProps = {
  size: "lg",
  href: "/",
};

export default AppLogo;
