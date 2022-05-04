import axios from "axios";
import qs from "qs";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import crab from "../images/crab.jpg";
import Preview from "./Preview";
import PreviewPreloader from "./PreviewPreloader";

export default function PreviewList() {
  const filters = useSelector((state) => state.filters);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["attractions", filters],
      async ({ pageParam = 0 }) => {
        const params = qs.stringify({
          page: pageParam,
          ...filters,
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
    // weird shorthand for making 8 skeleton loaders
    if (isLoading)
      return [...Array(8)].map((e, i) => <PreviewPreloader key={i} />);

    const previews = data.pages
      .map((group) =>
        group.docs.map((doc) => <Preview data={doc} key={doc.attraction_id} />)
      )
      .flat(1); // flatten so array length is accurate

    if (previews.length === 0) {
      return (
        <div className="col-span-2">
          <label className="mx-auto block w-full rounded-3xl bg-[#f6f6f6] p-4 text-center font-poppins">
            <img className="mx-auto w-1/2" src={crab} />
            Nothing Matched!
          </label>
        </div>
      );
    }
    return previews;
  }

  if (isError) return <span>Error: {error.message}</span>;
  return (
    <>
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
    </>
  );
}
