import React from "react";
import { colorClasses } from "../../configs/classStyles";
import { Colors } from "../../global";

interface BadgeProps {
  color: Colors;
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
  const classlist = ["badge"];

  if (color) {
    classlist.push(colorClasses[color]);
  }

  return <span className={classlist.join(" ")}>{children}</span>;
};

export default Badge;
