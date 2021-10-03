import React from "react";
import inputStyle from "@/styles/components/inputs.module.scss";
import checboxStyle from "@/styles/components/checkbox.module.scss";
import { InputProps, useInput } from "../../hooks/useInput";
import { CheckMarkIcon } from "../../configs/Icons";

type InputCheckboxProps = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Checkbox = React.forwardRef<
  HTMLInputElement,
  InputProps<InputCheckboxProps>
>((props, ref) => {
  const { wrapperClassFinal, InputLabel, InputHint, rest, id } =
    useInput(props);
  const classlist = [checboxStyle["checkbox"]];

  const { value, defaultValue, style, checked, error } = props;

  if (error) {
    classlist.push("error");
  }

  return (
    <div className={wrapperClassFinal.join(" ")} style={style}>
      <div className={inputStyle["input__main"]}>
        <div className={inputStyle["checkbox"]}>
          <div className={classlist.join(" ")}>
            <div className={checboxStyle["checkbox__content"]}>
              <input
                type="checkbox"
                {...{ ...rest, id, value, defaultValue, checked }}
                ref={ref}
              />
              <div className={checboxStyle["checkbox__proxy"]}>
                <CheckMarkIcon className="checkmark" />
              </div>
            </div>
            <InputLabel />
          </div>
        </div>
      </div>
      {/* <InputHint /> */}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
