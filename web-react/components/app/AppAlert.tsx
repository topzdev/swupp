import React, { useState } from "react";
import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "../../configs/Icons";

interface AppAlertProps {
  type: "info" | "error" | "warning" | "success";
  message: string;
  show?: boolean;
  timeout?: number;
}

const alertIcons = {
  info: <InfoIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  success: <SuccessIcon />,
};

const AppAlert: React.FC<AppAlertProps> = ({
  show,
  message,
  type,
  timeout,
}) => {
  const classlist = ["alert"];
  const [_show, _setShow] = useState(show);

  const close = () => {
    _setShow(false);
  };

  if (show && timeout) {
    setTimeout(() => {
      _setShow(false);
    }, timeout);
  }

  if (type) {
    classlist.push(`alert--${type}`);
  }

  return show ? (
    <div className={classlist.join(" ")}>
      <div className="alert__icon">{alertIcons[type]}</div>

      <div className="alert__message">{message}</div>

      <button className="alert__exit" onClick={close}>
        <CloseIcon />
      </button>
    </div>
  ) : (
    <></>
  );
};

AppAlert.defaultProps = {
  show: false,
};

export default AppAlert;
