import React from "react";

interface ProgressLinearProps {}

const ProgressLinear: React.FC<ProgressLinearProps> = ({}) => {
  return (
    <div className="progress progress--linear">
      <div className="indeterminate"></div>
    </div>
  );
};

export default ProgressLinear;
