import React, { useContext } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import qs from "qs";
import Preview from "../components/Preview";
import { QueryParamContext } from "../pages/AttractionsPage";

export default function PreviewList() {
  const [queryParam] = useContext(QueryParamContext);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["attractions", queryParam], fetchPreviews, {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  async function fetchPreviews({ pageParam = 0 }) {
    const res = await axios.get(
      `/api/attractions?page=${pageParam}${qs.stringify(queryParam)}`
    );

    return {
      docs: res.data.previewData,
      nextPage: res.data.nextPage,
    };
  }

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
    <div className="relative flex w-full flex-col items-center lg:w-2/3">
      <div className="grid gap-12 lg:grid-cols-2">
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
