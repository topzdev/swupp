import { LinkProps } from "next/link";
import React from "react";
import AppLink, { AppLinkProps } from "../app/AppLink";

type ButtonIconProps = {
  color?: "primary" | "accent" | "warning" | "success" | "default" | "light";
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  href?: LinkProps["href"];
  fab?: boolean;
  active?: boolean;
};

type ButtonIconType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonIconProps &
  Omit<AppLinkProps, "href">;

export const colorClasses = {
  primary: "color--primary",
  accent: "color--accent",
  warning: "color--warning",
  success: "color--success",
  default: "color--default",
  light: "color--light-gray",
};

export const buttonIconSizes = {
  sm: "btn-icon--small",
  md: "btn-icon--medium",
  lg: "btn-icon--large",
  xl: "btn-icon--xl",
};

const ButtonIcon: React.FC<ButtonIconType> = ({
  fab,
  active,
  size,
  color,
  href,
  icon,
  className,
  ...rest
}) => {
  const classlist = ["btn btn--icon", className];

  if (fab) {
    classlist.push("btn-icon--float");
  }

  if (active) {
    classlist.push("menu-active");
  }

  if (size) {
    classlist.push(buttonIconSizes[size]);
  }

  if (color) {
    classlist.push(colorClasses[color]);
  }

  let buttonClass = classlist.join(" ");

  return (
    <>
      {href ? (
        <AppLink {...rest} href={href} className={buttonClass}>
          {icon}
        </AppLink>
      ) : (
        <button {...rest} className={buttonClass}>
          {icon}
        </button>
      )}
    </>
  );
};

ButtonIcon.defaultProps = {
  size: "lg",
  color: "light",
};

export default ButtonIcon;
