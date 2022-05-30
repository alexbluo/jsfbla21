import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import SearchModal from "./SearchModal";

const Search = () => {
  const search = useSelector((state) => state.search);
  console.log(search);

  const { data, error, isLoading, isError } = useQuery(
    [search.input],
    async () => {
      const res = await axios.get(`/api/attractions/search?q=${search.input}`);
      console.log(res.data);
      return res.data;
    },
    {
      // only run the query when the search modal is open and there is an input that is not empty
      enabled: search.modalIsOpen && search.input.trim() !== "",
    }
  );

  return (
    <>
      <SearchBar />
      <SearchModal data={data} isOpen={search.modalIsOpen} />
    </>
  );
};

export default Search;
