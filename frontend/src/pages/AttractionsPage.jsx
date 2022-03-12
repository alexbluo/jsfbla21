import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";

// query param string to be passed up from child checkboxes
export const QueryParamContext = React.createContext({
  queryParam: "",
  setQueryParam: () => {},
});

export default function AttractionsPage() {
  const [queryParam, setQueryParam] = useState("");
  const value = { queryParam, setQueryParam };

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["attractions", queryParam],
    async ({pageNumber = 0}) => {
      const res = await axios.get(
        `/api/attractions?page=${pageNumber}${queryParam}`
      );
      console.log(pageNumber)
      return res.data;
    },
    {
      getNextPageParam: (prev) => console.log(prev),
    }
  );
  if (isLoading) return null;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <div className="content-body-container">
      <NavBar />
      <h1 className="page-title">Attractions</h1>
      <div className="flex justify-between">
        <QueryParamContext.Provider value={value}>
          <Facets />
        </QueryParamContext.Provider>
        <div className="relative flex flex-col items-center w-[69%]">
          <div className="grid grid-cols-2 gap-16">
            {data.pages.map((group) =>
              group.map((doc) => (
                <Preview data={doc} key={doc.attraction_id} />
              ))
            )}
          </div>
          {hasNextPage && (
            <button
              className="px-4 py-2 mt-8 text-white rounded-md bg-red"
              onClick={() => fetchNextPage()}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
