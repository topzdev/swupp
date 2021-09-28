import inputStyle from "@/styles/components/inputs.module.scss";
import React from "react";
import { textColorsClass } from "../configs/classStyles";
import scrollToElement from "../utils/scrollToElement";

export type InputProps<T> = {
  hint?: React.ReactNode | String;
  error?: React.ReactNode | String | Boolean;
  success?: React.ReactNode | String | Boolean;
  label?: React.ReactNode | String;
  iconLeft?: any;
  iconRight?: any;
  iconRightFunc?: Function;
  iconLeftFunc?: Function;
  variant?: "filled" | "outlined";
  clearable?: Boolean;
  textarea?: Boolean;
  wrapperClass?: String;
  dense?: Boolean;
  block?: Boolean;
  optional?: Boolean;
  required?: Boolean;
  id?: string;
  name?: string;
  focus?: Boolean;
  value?: any;
  type?: string;
  defaultValue?: any;
  maxLength?: number;
  focusPlaceholder?: Boolean;
} & T;

const inputVariantClass = {
  filled: inputStyle["input--filled"],
  outlined: inputStyle["input--outlined"],
};

export function useInput<T>({
  hint,
  error,
  success,
  iconLeft,
  iconRight,
  iconRightFunc,
  iconLeftFunc,
  variant,
  textarea,
  label,
  dense,
  value,
  wrapperClass,
  focusPlaceholder,
  block,
  type,
  optional,
  focus,
  maxLength,
  required,
  ...rest
}: InputProps<T>) {
  const wrapperClassFinal = ["input", wrapperClass, inputStyle.input];
  const placeholderClass = [inputStyle.input__placeholder];

  if (variant) {
    wrapperClassFinal.push(inputVariantClass[variant]);
  }

  if (dense) {
    wrapperClassFinal.push(inputStyle["input-dense"]);
  }

  if (iconLeft) {
    wrapperClassFinal.push(inputStyle["has-left-icon"]);
  }

  if (iconRight) {
    wrapperClassFinal.push(inputStyle["has-right-icon"]);
  }

  // if (value) {
  //   placeholderClass.push(
  //     label ? inputStyle["placeholder-hide"] : inputStyle["has-value"]
  //   );

  //   if (!focusPlaceholder) placeholderClass.push(inputStyle["placeholder-hide"]);
  // }

  const inputId = rest.id || rest.name;

  if (focus) {
    if (inputId) scrollToElement(inputId);
  }

  if (error !== undefined) {
    wrapperClassFinal.push(inputStyle["is-error"]);
  }

  if (success !== undefined) {
    wrapperClassFinal.push(inputStyle["is-success"]);
  }

  if (block) {
    wrapperClassFinal.push(inputStyle["input-block"]);
  }

  const renderIcon = (
    icon: InputProps<T>["iconLeft"],
    func?: InputProps<T>["iconLeft"],
    className?: string
  ) => {
    if (func)
      return (
        <button
          className={[className, inputStyle["input__icon-button"]].join(" ")}
          onClick={func}
        >
          {icon}
        </button>
      );

    return <span className={className}>{icon}</span>;
  };

  const InputWrapper: React.FC<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  > = ({ className, style, children }) => {
    return (
      <div
        className={[className, ...wrapperClassFinal].join(" ")}
        style={style}
      >
        {children}
      </div>
    );
  };

  const InputIconLeft = () =>
    iconLeft
      ? renderIcon(iconLeft, iconLeftFunc, inputStyle.input__iconLeft)
      : null;

  const InputIconRight = () =>
    iconRight
      ? renderIcon(iconRight, iconRightFunc, inputStyle.input__iconRight)
      : null;

  // const InputPlaceholder = () =>
  //   placeholder ? (
  //     <p className={placeholderClass.join(" ")}>{placeholder}</p>
  //   ) : null;

  const InputHint = () => {
    let hintMessage = null;
    let hintClassName = ["hint", inputStyle.input__hint];

    console.log("Inpunt Hint Error", error);

    if (error) {
      hintMessage = error;
      hintClassName.push("text--danger");
    } else if (success) {
      hintMessage = success;
      hintClassName.push("text--success");
    } else {
      hintMessage = hint;
    }

    return hint || error || success ? (
      <span className={hintClassName.join(" ")}>{hintMessage}</span>
    ) : null;
  };

  const InputLabel = () => {
    if (!label) return <></>;
    return (
      <label className={inputStyle.input__label} htmlFor={inputId}>
        {label}{" "}
        {optional && (
          <span className="text--alpha-2" style={{ marginLeft: 1 }}>
            (Optional)
          </span>
        )}
        {required && <span className="text--danger">*</span>}
      </label>
    );
  };

  const InputCounter = () => {
    if (!maxLength || !value) return <></>;
    const counterClasslist = [inputStyle.input__counter];
    const length = value.toString().length;

    if (length > maxLength) counterClasslist.push(textColorsClass["danger"]);

    return (
      <span className={counterClasslist.join(" ")}>
        {value.length}/{maxLength}
      </span>
    );
  };

  const InputDetails = () => {
    return (
      <div className={inputStyle.input__details}>
        <InputHint />
        <InputCounter />
      </div>
    );
  };

  return {
    rest,
    label,
    id: inputId,
    wrapperClassFinal,
    placeholderClass,
    // placeholder,
    InputIconRight,
    InputIconLeft,
    renderIcon,
    // InputPlaceholder,
    InputWrapper,
    InputHint,
    InputLabel,
    InputCounter,
    InputDetails,
  };
}
