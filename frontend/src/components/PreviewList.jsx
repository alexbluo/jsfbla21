import React, { useContext, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import qs from "qs";
import Preview from "../components/Preview";
import { QueryParamContext } from "../pages/AttractionsPage";

export default function PreviewList() {
  const [queryParam] = useContext(QueryParamContext);

  useEffect(() => {
    console.log(queryParam);
  }, [queryParam]);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["attractions", queryParam],
      async ({ pageParam = 0 }) => {
        const params = qs.stringify({
          page: pageParam,
          ...queryParam,
        });
        const res = await axios.get(`/api/attractions?${params}`);
        return { docs: res.data.previewData, nextPage: res.data.nextPage }; // return to "data"
      },
      { getNextPageParam: (lastPage) => lastPage.nextPage }
    );

  function renderPreviews() {
    const previews = data.pages
      .map((group) =>
        group.docs.map((doc) => <Preview data={doc} key={doc.attraction_id} />)
      )
      .flat(1); // flatten so array length is accurate

    if (previews.length === 0) {
      return (
        <span className="flex col-span-full w-full justify-center">
          Nothing Matched!
        </span>
      );
    }
    return previews;
  }

  if (isLoading) {
    return (
      <span className="flex w-full justify-center lg:w-2/3">Loading...</span>
    );
  }
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="relative flex w-full flex-col items-center lg:w-2/3">
      <div className="grid w-full gap-12 sm:grid-cols-2">
        {renderPreviews()}
      </div>
      {hasNextPage && (
        <button
          className="mt-8 rounded-md bg-red px-4 py-2 text-white shadow-md duration-100 hover:brightness-75"
          onClick={fetchNextPage}
        >
          Load More
        </button>
      )}
    </div>
  );
}
