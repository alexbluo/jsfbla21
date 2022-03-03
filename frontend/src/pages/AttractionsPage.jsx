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

  const [queryParam, setQueryParam] = useState("");
  const value = { queryParam, setQueryParam };

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    }
  }, [])

  useEffect(async () => {
    const res = await axios.get(
      `/api/attractions?page=${pageNumber}${queryParam}`
    );
    // check if page is still mounted and state can be updated
    if (_isMounted.current) {
      if (pageNumber === 0) {
        // if page number is zero then don't use previous data
        setPreviewData(res.data);
      } else {
        // update preview data with both new and previous data
        setPreviewData((previous) => [...previous, ...res.data]);
      }
    }

    // return () => {
    //   _isMounted.current = false;
    // };
  }, [pageNumber, queryParam]);

  useEffect(() => {
    if (_isMounted.current) {
      setPageNumber(0);
    }

    // return () => {
    //   _isMounted.current = false;
    // }
  }, [queryParam]);

  /**
   * Shows the next set of attractions when the load more button is clicked.
   */
  function handleLoadClick() {
    setPageNumber(pageNumber + 1);
  }

  function renderPreviews() {
    return previewData.length === 0 ? (
      <p>Nothing Matched!</p>
    ) : (
      <div className="grid grid-cols-2">
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
          className="w-[16%] rounded-sm bg-red text-white"
          onClick={handleLoadClick}
        >
          Load More
        </button>
      )
    );
  }

  return (
    <div className="container px-[8%] py-8">
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
