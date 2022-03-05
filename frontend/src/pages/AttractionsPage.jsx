import React, { useState, useEffect, useRef } from "react";
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
  const _isMounted = useRef(true);
  const [previewData, setPreviewData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  // TODO: add totalPageCount by taking cursor.count so that load more button goes away at max
  // TODO: fix nothing matched, style landing and help pages, redo map, make cool previews and maybe dropdown as well

  const [queryParam, setQueryParam] = useState("");
  const value = { queryParam, setQueryParam };

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(async () => {
    const res = await axios.get(
      `/api/attractions?page=${pageNumber}${queryParam}`
    );

    // check if page is still mounted and state can be updated
    if (_isMounted.current) {
      if (pageNumber === 0) {
        // if page number is zero then don't use previous data
        setPreviewData(res.data.previewData);
        setTotalPageCount(res.data.totalPageCount)
      } else {
        // update preview data with both new and previous data
        setPreviewData((prev) => [...prev, ...res.data.previewData]);
      }
    }
  }, [pageNumber, queryParam]);

  useEffect(() => {
    if (_isMounted.current) {
      setPageNumber(0);
    }
  }, [queryParam]);

  function renderPreviews() {
    return previewData.length === 0 ? (
      <p>Nothing Matched!</p>
    ) : (
      <div className="grid grid-cols-2 gap-16">
        {previewData.map((doc) => (
          <Preview data={doc} key={doc.attraction_id} />
        ))}
      </div>
    );
  }

  /**
   * TODO: revise conditions after lazy loading is implemented, load more button will like show even at max until then
   * @returns a load more button if all conditions are met, otherwise nothing is returned
   */
  function renderLoadMoreButton() {
    return (
      previewData &&
      previewData.length > 1 && (
        <button
          className="w-[16%] h-8 mt-8 rounded-md bg-red text-white"
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Load More
        </button>
      )
    );
  }

  return (
    <div className="container px-[8%] pt-8 pb-16">
      <NavBar />
      <h1 className="text-4xl mb-4">Attractions</h1>
      <div className="flex justify-between">
        <QueryParamContext.Provider value={value}>
          <Facets />
        </QueryParamContext.Provider>
        <div className="relative flex flex-col items-center w-[69%]">
          {renderPreviews()}
          {renderLoadMoreButton()}
        </div>
      </div>
    </div>
  );
}
