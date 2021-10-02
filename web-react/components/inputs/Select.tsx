import React, { MutableRefObject, useState } from "react";
import style from "@/styles/components/inputs.module.scss";
import selectStyle from "@/styles/components/select.module.scss";
import { InputProps, useInput } from "@/hooks/useInput";
import { useCallback } from "react";
import { ArrowDownIcon } from "../../configs/Icons";
import ClickOutside from "../utils/ClickOutside";
import { useRef } from "react";

export type SelectOptionsType = {
  value: string | number;
  label: React.ReactNode | string | number;
  icon?: React.ReactNode;
};

export type SelectProps = {
  placeholder?: string;
  options: SelectOptionsType[];
  value?: SelectOptionsType["value"];
  focus?: Boolean;
  onChangeValue?: (value: SelectOptionsType["value"]) => void;
};

type SelectOptionProps = {
  option: SelectOptionsType;
  value?: SelectOptionsType["value"];
  onChangeSelected?: (selected: SelectOptionsType) => void;
};

const SelectOption: React.FC<SelectOptionProps> = (props) => {
  const { option, value, onChangeSelected } = props;
  const optionClass = [selectStyle["select__options-item"]];
  if (value) {
    optionClass.push(
      option.value === value ? selectStyle["option-selected"] : ""
    );
  }

  return (
    <li
      className={optionClass.join(" ")}
      onClick={
        onChangeSelected
          ? () => onChangeSelected(option)
          : () => alert("Please provide acton")
      }
    >
      {option.icon && (
        <span className={selectStyle["select__options-icon"]}>
          {option.icon}
        </span>
      )}
      <span className={selectStyle["select__options-label"]}>
        {option.label}
      </span>
    </li>
  );
};

const Select: React.FC<InputProps<SelectProps>> = (props) => {
  const customRef = useRef(null);
  const { renderIcon, wrapperClassFinal, InputLabel, InputHint, id } =
    useInput<SelectProps>(props);

  const [show, setShow] = useState(false);

  const { onChangeValue, value, options, placeholder, focus } = props;

  const [selected, setSelected] = useState<SelectOptionsType>(
    options.filter((item) => item.value === value)[0]
  );

  const onChangeSelected = useCallback(
    (_selected: SelectOptionsType) => {
      setSelected((state) => _selected);
      if (onChangeValue) onChangeValue(_selected.value);
    },
    [value]
  );

  const onToggleShow = useCallback(() => {
    console.log("Hello, Wolrd!");
    setShow((state) => !state);
  }, [show]);

  return (
    <div
      ref={customRef}
      className={
        wrapperClassFinal.join(" ") + " " + selectStyle["select__container"]
      }
      id={id}
      onClick={() => onToggleShow()}
    >
      <InputLabel />

      <div className={style.input__main}>
        {selected &&
          selected.icon &&
          renderIcon(selected.icon, null, selectStyle["select__icon-left"])}

        <div className={style.input__field}>
          {/* <InputPlaceholder /> */}
          <div className={"select " + selectStyle.select}>
            {selected && selected.value ? (
              <span className={selectStyle["select__value"]}>
                {selected.label}
              </span>
            ) : (
              <span className={selectStyle["select__placeholder"]}>
                {placeholder}
              </span>
            )}
          </div>
        </div>
        <div className={selectStyle["select__options"] + " elevation-1"}>
          <ClickOutside open={show} setClose={setShow}>
            <ul className={selectStyle["select__options-list"]}>
              {options.map((item, idx) => (
                <SelectOption
                  option={item}
                  onChangeSelected={onChangeSelected}
                  value={value}
                  key={idx}
                />
              ))}
            </ul>
          </ClickOutside>
        </div>

        {renderIcon(<ArrowDownIcon />, null, selectStyle["select__icon-right"])}
      </div>
      <InputHint />
    </div>
  );
};

Select.defaultProps = {
  variant: "filled",
  focusPlaceholder: true,
};

export default Select;
