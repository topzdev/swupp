import inputStyle from "@/styles/components/inputs.module.scss";
import React from "react";
import { InputProps, useInput } from "@/hooks/useInput";

type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextField = React.forwardRef<
  HTMLInputElement,
  InputProps<HTMLInputProps>
>((props, ref) => {
  const {
    wrapperClassFinal,
    InputIconLeft,
    InputIconRight,
    InputLabel,
    InputDetails,
    rest,
    id,
  } = useInput(props);

  const { value, defaultValue, style, type } = props;

  return (
    <div className={wrapperClassFinal.join(" ")} style={style}>
      <InputLabel />

      <div className={inputStyle.input__main}>
        <InputIconLeft />

        <div className={inputStyle.input__field}>
          {/* <InputPlaceholder /> */}

          <input {...{ ...rest, id, value, defaultValue, type }} ref={ref} />
        </div>

        <InputIconRight />
      </div>
      <InputDetails />
    </div>
  );
});

TextField.displayName = "TextField";

TextField.defaultProps = {
  variant: "filled",
  focusPlaceholder: true,
  type: "text",
};

export default TextField;
