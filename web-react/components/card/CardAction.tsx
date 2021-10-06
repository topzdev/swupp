import React from "react";

type CardActionProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const CardAction: React.FC<CardActionProps> = ({ children, className }) => {
  const classlist = ["card__action", className];

  return <div className={classlist.join(" ")}>{children}</div>;
};

export default CardAction;
