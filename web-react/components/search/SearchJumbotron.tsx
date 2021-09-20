import React from "react";
import SearchBar from "./SearchBar";

interface SearchJumbotronProps {}

const SearchJumbotron: React.FC<SearchJumbotronProps> = ({}) => {
  return (
    <div className="search-jumbotron abstract-bg--2">
      <div className="container">
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchJumbotron;
