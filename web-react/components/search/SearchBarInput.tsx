import React from "react";
import { SearchIcon } from "../../config/Icons";

type SearchBarInputProps = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const SearchBarInput: React.FC<SearchBarInputProps> = ({ ...rest }) => {
  return (
    <div className="search-bar-input">
      <div className="inp--search">
        <SearchIcon className="search-bar-input__icon" />
        <input {...rest} className="inp inp--search__inp" type="text" />
        {rest.value === "" && (
          <label className="inp--search__placeholder">
            <span className="p-default">Search post like</span>
            <span className="p-dynamic">
              {'"Looking for keyboard swap to mouse"'}
            </span>
          </label>
        )}
      </div>
    </div>
  );
};

export default SearchBarInput;
