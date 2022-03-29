import React, { useState, useContext } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import Preview from "../components/Preview";
import { QueryParamContext } from "../pages/AttractionsPage";

export default function PreviewList() {
  const { queryParam } = useContext(QueryParamContext);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["attractions", queryParam],
      async ({ pageParam = 0 }) => {
        const res = await axios.get(
          `/api/attractions?page=${pageParam}${queryParam}`
        );
        return {
          docs: res.data.previewData,
          nextPage: res.data.nextPage,
        }; // return to "data"
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  function renderPreviews() {
    const previews = data.pages
      .map((group) =>
        group.docs.map((doc) => <Preview data={doc} key={doc.attraction_id} />)
      )
      .flat(1); // flatten so array length is accurate
    return previews.length === 0 ? <p>Nothing Matched!</p> : previews;
  }

  if (isLoading) return null;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="relative flex w-2/3 flex-col items-center">
      <div className="grid grid-cols-2 gap-12">{renderPreviews()}</div>
      {hasNextPage && (
        <button
          className="mt-8 rounded-md bg-red px-4 py-2 text-white shadow-md duration-100 hover:brightness-75"
          onClick={() => fetchNextPage()}
        >
          Load More
        </button>
      )}
    </div>
  );
}
