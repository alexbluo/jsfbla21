import axios from "axios";
import qs from "qs";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import crab from "../images/crab.jpg";
import Preview from "./Preview";
import PreviewPreloader from "./PreviewPreloader";

const PreviewList = () => {
  const { filterSearchInput } = useSelector((state) => state.search);
  const checkedFilters = useSelector((state) => state.filters);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["attractions", filterSearchInput, checkedFilters],
      async ({ pageParam = 0 }) => {
        const params = qs.stringify({
          search: filterSearchInput,
          filters: checkedFilters,
          page: pageParam,
        });

        const res = await axios.get(`/api/attractions?${params}`);

        return {
          docs: res.data.attractions,
          nextPageNumber: res.data.nextPageNumber,
        }; // return to "data"
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPageNumber,
        keepPreviousData: true,
      }
    );

  const renderPreviews = () => {
    // weird shorthand for making 8 skeleton loaders
    if (isLoading)
      return [...Array(8)].map((_, i) => <PreviewPreloader key={i} />);

    const previews = data.pages
      .map((group) =>
        group.docs.map((doc) => <Preview data={doc} key={doc.attraction_id} />)
      )
      .flat(1); // flatten so that preview length in next step is always accurate

    if (previews.length === 0) {
      return (
        <div className="col-span-2">
          <label className="mx-auto block w-full rounded-2xl bg-[#f6f6f6] p-6 text-center font-poppins">
            <img className="mx-auto w-1/2" src={crab} />
            Nothing Matched!
          </label>
        </div>
      );
    }
    return previews;
  };

  if (isError) return <span>Error: {error.message}</span>;
  return (
    <>
      <div className="grid w-full gap-12 sm:grid-cols-2">
        {renderPreviews()}
      </div>
      {hasNextPage && (
        <button
          className="mt-12 rounded-md border border-red p-4 text-red duration-200 ease-in-out hover:bg-red hover:text-white"
          onClick={fetchNextPage}
        >
          Load More
        </button>
      )}
    </>
  );
};

export default PreviewList;
