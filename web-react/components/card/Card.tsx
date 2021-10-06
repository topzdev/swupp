import React from "react";
import ProgressLinear from "../progress/ProgressLinear";

interface CardProps {
  rounded?: boolean;
  elevate?: boolean;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({ rounded, elevate, loading, children }) => {
  const classlist = ["card"];

  if (rounded) classlist.push("card--rounded");
  if (elevate) classlist.push("card--elevate");

  return (
    <div className={classlist.join(" ")}>
      {loading && <ProgressLinear />}
      {children}
    </div>
  );
};

export default Card;
