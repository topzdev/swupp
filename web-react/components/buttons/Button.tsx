import React, { FC } from "react";
import styles from "@/styles/components/buttons.module.scss";
import Link, { LinkProps } from "next/link";

import { LoadingIcon } from "@/configs/Icons";
import AppLink, { AppLinkProps } from "../app/AppLink";
import {
  backgroundColorsClass,
  btnOutlineClass,
  btnTextClass,
  buttonSizesClass,
  colorClasses,
  shadeColorsClass,
} from "../../configs/classStyles";

export type ButtonCustomProps = {
  block?: Boolean;
  outlined?: Boolean;
  disabled?: Boolean;
  text?: Boolean;
  size?: Size;
  loading?: Boolean;
  raised?: number;
  color?: NewColors | "";
  href?: LinkProps["href"];
  icon?: Boolean;
  pressed?: Boolean;
  rounded?: Boolean;
};

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonCustomProps &
  Omit<AppLinkProps, "href">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      block,
      color,
      size,
      loading,
      outlined,
      text,
      href,
      icon,
      rounded,
      className,
      pressed,
      ...rest
    } = props;
    let buttonClass = ["button", styles.btn, styles.btn__defaults, className];

    if (color) {
      if (outlined) {
        buttonClass.push(styles["btn-outlined"]);
        buttonClass.push(btnOutlineClass[color]);
      } else if (text) {
        buttonClass.push(styles["btn-text"]);
        buttonClass.push(btnTextClass[color]);
      } else if (pressed) {
        buttonClass.push(styles["btn-text"]);
        buttonClass.push(btnTextClass[color]);
        buttonClass.push(shadeColorsClass[color]);
      } else {
        buttonClass.push(backgroundColorsClass[color]);
      }
    }
    if (icon) {
      buttonClass.push(styles["btn-icon"]);
    }

    if (size) {
      buttonClass.push(buttonSizesClass[size]);
    }

    if (block) {
      buttonClass.push(styles["btn-block"]);
    }

    if (rounded) {
      buttonClass.push(styles["btn-rounded"]);
    }

    const ButtonContent = () => (
      <>
        {loading && (
          <span className={styles.btn__loading}>
            <LoadingIcon />
          </span>
        )}
        <span className={styles.btn__content}>{props.children}</span>
      </>
    );

    return (
      <>
        {href ? (
          <AppLink {...rest} href={href} className={buttonClass.join(" ")}>
            <ButtonContent />
          </AppLink>
        ) : (
          <button {...rest} ref={ref} className={buttonClass.join(" ")}>
            <ButtonContent />
          </button>
        )}
      </>
    );
  }
);

Button.displayName = "Button";

Button.defaultProps = {
  color: "primary",
  size: "medium",
};

export default Button;
