import { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

/**
 * create dropdown as the user types:
 * on backend, combine all current endpoints except id into one endpoint
 * query filters (redux) + search on attractions page, distance + search on map
 * check if each exists on req.query before pushing to the final query array, which is passed into mongodb aggregation pipeline
 * if theres enough time, use react intersection observer with useinfinitequery https://codesandbox.io/s/github/tannerlinsley/react-query/tree/master/examples/load-more-infinite-scroll
 * otherwise just make pagination only on previewlist
 * prob scrap the dropdown as typing thing and just refetch on search press, add filterblock for attractions page and display search result items as MARKERS
 * then prob dont add debouncing/async/conurrent - no time
 */
const SearchBar = ({}) => {
  const [input, setInput] = useState("");

  // const { data, error, isLoading, isError } = useQuery(
  //   [search.input],
  //   async () => {
  //     const res = await axios.get(``);
  //     console.log(res.data);
  //     return res.data;
  //   },
  //   { enabled: false }
  // );

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleEnterKeyDown = (e) => {
    // only respond to presses of the enter key
    if (!e.key === "Enter") return;

    // refetch()
  };

  const handleSearchClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="mb-1 flex h-16 w-full gap-1 rounded-md border-4 bg-black duration-150 ease-in-out focus-within:outline focus-within:outline-gold/50">
      <input
        className="w-full rounded-l bg-gold pl-4 font-raleway text-lg outline-none"
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleEnterKeyDown}
      />
      <button
        className="group aspect-square h-full rounded-r duration-150 ease-in-out hover:bg-gold active:brightness-75"
        onClick={handleSearchClick}
      >
        <svg
          className="mx-auto h-1/2 w-1/2 fill-gold duration-150 ease-in-out group-hover:fill-black"
          viewBox="0 0 50 50"
        >
          <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
