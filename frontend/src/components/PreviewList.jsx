import { useContext } from "react";
import axios from "axios";
import qs from "qs";
import { useInfiniteQuery } from "react-query";
import { QueryParamContext } from "../pages/AttractionsPage";
import Preview from "./Preview";
import PreviewPreloader from "./PreviewPreloader";

export default function PreviewList() {
  const [queryParam] = useContext(QueryParamContext);

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
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        keepPreviousData: true,
      }
    );

  function renderPreviews() {
    if (isLoading) {
      return [...Array(8)].map((e, i) => <PreviewPreloader key={i} />);
    }

    const previews = data.pages
      .map((group) =>
        group.docs.map((doc) => <Preview data={doc} key={doc.attraction_id} />)
      )
      .flat(1); // flatten so array length is accurate

    if (previews.length === 0) {
      return (
        <span className="col-span-full flex w-full justify-center">
          Nothing Matched!
        </span>
      );
    }
    return previews;
  }

  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="relative flex w-full flex-col items-center xl:w-2/3">
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
