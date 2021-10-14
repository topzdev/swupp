import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";

export type AppLinkProps = {
  activeClass?: string;
  nav?: boolean;
  className?: string;
  exact?: boolean;
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

  // Normalize and split paths into their segments
  const segment = (p: any) =>
    new URL(p, "http://example.com").pathname.split("/").filter((s) => s);
  const currentPath = segment(asPath);
  const targetPath = segment(props.as || props.href);
  // The route is active if all of the following are true:
  //   1. There are at least as many segments in the current route as in the destination route
  //   2. The current route matches the destination route
  //   3. If we're in “exact" mode, there are no extra path segments at the end
  const isActive =
    currentPath.length >= targetPath.length &&
    targetPath.every((p, i) => currentPath[i] === p) &&
    (!props.exact || targetPath.length === currentPath.length);

  if (isActive) {
    classList.push(activeClass || "active");
  }

  return (
    <Link {...props}>
      <a className={classList.join(" ")}>{children}</a>
    </Link>
  );
};

export default AppLink;
