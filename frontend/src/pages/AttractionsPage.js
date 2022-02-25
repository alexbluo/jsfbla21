import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";
import "../css/AttractionsPage.css";

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
    let isMounted = true;
    console.log(pageNumber);

    fetch(`/api/attractions?page=${pageNumber}${queryParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // check if page is still mounted and state can be updated
        if (isMounted) {
          // check if previewData is null, which only occurs on initial render
          setPreviewData(data)
          // if (previewData) {
          //   // if previewData is not null then previous previewData can be and updated
          //   setPreviewData([...previewData, data]);
          // } else {
          //   setPreviewData(data);
          // }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pageNumber, queryParam]);

  useEffect(() => {
    setPreviewData(null);
    setPageNumber(0);
  }, [queryParam]);

  /**
   * Shows the next set of attractions when the load more button is clicked.
   * TODO: https://stackoverflow.com/questions/30253287/lazy-loading-using-nodejs-and-mongodb-as-backend-data
   */
  function handleLoadClick() {
    setPageNumber(pageNumber + 1);
  }

  function renderPreviews() {
    return (
      previewData &&
      (previewData.length === 0 ? (
        <p className="self-center">Nothing Matched!</p>
      ) : (
        <div className="grid grid-cols-2">
          {previewData.map((doc) => {
            return <Preview data={doc} key={doc.attraction_id} />;
          })}
        </div>
      ))
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
