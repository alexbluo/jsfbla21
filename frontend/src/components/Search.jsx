import { useState } from "react";
import SearchBar from "./SearchBar";

const Search = () => {
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

  const handleSearchInput = (e) => {
    const value = e.target.value.trim();

    // ignore empty inputs
    if (value === "") return;

    
  };

  const handleSearchEnter = () => {
    setSearchModalIsOpen(true);
  };

  return (
    <>
      <SearchBar onSearchEnter={handleSearchEnter} />
      {searchModalIsOpen && <SearchModal open={searchModalIsOpen}></SearchModal>}
    </>
  );
};

export default Search;
