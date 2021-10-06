import React from "react";

type CardHeaderProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  const classlist = ["card__header", className];

  return <div className={classlist.join(" ")}>{children}</div>;
};

export default CardHeader;
