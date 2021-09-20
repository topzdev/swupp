import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";

export type AppLinkProps = {
  activeClass?: string;
  nav?: boolean;
  className?: string;
} & LinkProps;

const AppLink: React.FC<AppLinkProps> = ({
  activeClass,
  children,
  nav,
  className,
  ...props
}) => {
  const { asPath } = useRouter();
  const classList = [];

  if (className) {
    classList.push(className);
  }

  if (
    nav &&
    (asPath ===
      (typeof props.href === "object" ? props.href.pathname : props.href) ||
      asPath === props.as)
  ) {
    classList.push(activeClass || "active");
  }

  return (
    <Link {...props}>
      <a className={classList.join(" ")}>{children}</a>
    </Link>
  );
};

export default AppLink;
