import React from "react";

type CardBodyProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  const classlist = ["card__body", className];

  return <div className={classlist.join(" ")}>{children}</div>;
};

export default CardBody;
