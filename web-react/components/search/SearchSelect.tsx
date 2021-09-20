import React, { useState } from "react";
import ClickOutside from "../utils/ClickOutside";

export interface SearchSelectOptions {
  id: string;
  text: string;
}

interface SearchSelectProps {
  value: string | number;
  itemValue: string;
  itemText: string;
  options: SearchSelectOptions[];
  label: string;
  onSelected: (value: any) => void;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  itemValue,
  itemText,
  options,
  label,
  value,
  onSelected,
}) => {
  const [show, setShow] = useState(false);
  const classlist = ["search-select", show ? "show" : ""];
  const selectValue = (item: any) => {
    return itemValue ? item[itemValue] : item;
  };
  const selectText = (item: any) => {
    return itemText ? item[itemText] : item;
  };

  const displayText = () => {
    if (options.length && itemValue !== undefined) {
      return (options as any).filter(
        (item: any) => item[itemValue] === value
      )[0].text;
    } else {
      return value;
    }
  };

  return (
    <div
      onClick={() => setShow((state) => !state)}
      className={classlist.join(" ")}
    >
      <div className="search-select__body">
        <div className="search-select__value">{displayText()}</div>

        <div className="search-select__label">{label}</div>

        <div className="search-select__arrow"></div>
      </div>

      <ul className="search-select__list">
        <ClickOutside open={show} setClose={setShow}>
          {options.map((item) => (
            <li
              className={selectValue(item) === value ? "active" : ""}
              key={selectValue(item)}
              onClick={() => onSelected((item as any)[itemValue])}
            >
              {selectText(item)}
            </li>
          ))}
        </ClickOutside>
      </ul>
    </div>
  );
};

export default SearchSelect;
