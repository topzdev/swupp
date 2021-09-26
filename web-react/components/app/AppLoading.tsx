import React from "react";
import LoadingIcon from "../progress/LoadingIcon";

interface AppLoadingProps {}

const AppLoading: React.FC<AppLoadingProps> = ({}) => {
  return (
    <div className="container loading">
      <LoadingIcon />
    </div>
  );
};

export default AppLoading;
