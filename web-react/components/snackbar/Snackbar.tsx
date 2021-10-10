import React, { ReactNode, useEffect, useState } from "react";
import { CloseIcon } from "../../configs/Icons";
import { SnackbarConfig } from "../../context/SnackbarContext";
import AppImage from "../app/AppImage";
import AppLink from "../app/AppLink";
import Button from "../buttons/Button";

type SnackbarProps = {
  config: SnackbarConfig;
};

const barTypes = {
  success: "snackbar--success",
  error: "snackbar--error",
  warning: "snackbar--warning",
};

const Snackbar: React.FC<SnackbarProps> = ({ config }) => {
  const { show, type, timeout, image, title, body, showClose, link } = config;
  const [_show, _setShow] = useState(false);
  const classlist = ["snackbar"];

  useEffect(() => {
    console.log("USE_EFFECT_UPDATED_CONFIG", config);
    _setShow(config.show);
  }, [config]);

  if (type) {
    classlist.push(barTypes[type]);
  }
  if (timeout) {
    setTimeout(() => _setShow(false), timeout);
  }

  const close = () => {
    console.log("Closing");
    _setShow(false);
  };

  const renderContent = () => {
    return (
      <>
        {image && (
          <div className="snackbar__icon">
            <AppImage src={image}></AppImage>
          </div>
        )}

        <div className="snackbar__body">
          <div className="snackbar__title">{title}</div>
          <div className="snackbar__description">{body}</div>
        </div>

        {showClose && (
          <div className="snackbar__action">
            <Button icon color="secondary" onClick={close}>
              <CloseIcon />
            </Button>
          </div>
        )}
      </>
    );
  };

  const className = classlist.join(" ");

  if (!_show) return null;

  return link ? (
    <AppLink className={className} href={link}>
      {renderContent()}
    </AppLink>
  ) : (
    <div className={className}>{renderContent()}</div>
  );
};

export default Snackbar;
