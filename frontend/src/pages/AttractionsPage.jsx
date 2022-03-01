import React, { useState, useEffect } from "react";
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
  const [previewData, setPreviewData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [queryParam, setQueryParam] = useState("");
  const value = { queryParam, setQueryParam };

  useEffect(() => {
    setPreviewData([]);
    setPageNumber(0);
  }, [queryParam]);
  
  useEffect(async () => {
    let isMounted = true;
    console.log(pageNumber);
    
    const res = await axios.get(
      `/api/attractions?page=${pageNumber}${queryParam}`
    );
    // check if page is still mounted and state can be updated
    if (isMounted) {
      // update preview data with both new and previous data
      setPreviewData((previous) => [...previous, ...res.data]);
    }

    return () => {
      isMounted = false;
    };
  }, [pageNumber, queryParam]);

  /**
   * Shows the next set of attractions when the load more button is clicked.
   * TODO: https://stackoverflow.com/questions/30253287/lazy-loading-using-nodejs-and-mongodb-as-backend-data
   */
  function handleLoadClick() {
    setPageNumber(pageNumber + 1);
  }

  function renderPreviews() {
    return previewData.length === 0 ? (
      <p className="self-center">Nothing Matched!</p>
    ) : (
      <div className="grid grid-cols-2">
        {previewData.map((doc) => {
          return <Preview data={doc} key={doc.attraction_id} />;
        })}
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
          className="self-center w-[16%] rounded-sm bg-red text-white"
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
        <div className="relative flex flex-col justify-center w-[69%]">
          {/* ^ use items-center? */}
          {renderPreviews()}
          {renderLoadMoreButton()}
        </div>
      </div>
    </div>
  );
}
