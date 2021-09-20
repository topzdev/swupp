import React, { useState } from "react";
import { SearchIcon } from "../../config/Icons";
import { CATEGORIES, CONDITIONS } from "../../constant";
import SearchBarInput from "./SearchBarInput";
import SearchSelect, { SearchSelectOptions } from "./SearchSelect";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const options = {
    category: [{ id: "all", text: "All" }, ...CATEGORIES],
    condition: [{ id: "all", text: "All" }, ...CONDITIONS],
  };

  return (
    <div className="search-bar">
      <div className="search-bar__body">
        <SearchBarInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <SearchSelect
          options={options.category}
          label="Category"
          itemText="text"
          itemValue="id"
          value={category}
          onSelected={(value) => setCategory(value)}
        />
        <SearchSelect
          options={options.condition}
          label="Condition"
          itemText="text"
          itemValue="id"
          value={condition}
          onSelected={(value) => setCondition(value)}
        />
      </div>

      <div className="search-bar__action">
        <button className="btn btn--search">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
