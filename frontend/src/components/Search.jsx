import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";

const Search = () => {
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

  const handleSearchInput = (e) => {
    const value = e.target.value.trim();

    // ignore empty inputs
    if (value === "") return;
  };

  return (
    <>
      <SearchBar
        onSearchInput={handleSearchInput}
        onSearchEnter={() => setSearchModalIsOpen(true)}
      />
      <SearchModal
        onClose={() => setSearchModalIsOpen(false)}
        isOpen={searchModalIsOpen}
      >
        <div> </div><SearchBar />
      </SearchModal>
    </>
  );
};

export default Search;
