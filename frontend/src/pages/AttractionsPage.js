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
  const [previewData, setPreviewData] = useState(null);
  const [previewElements, setPreviewElements] = useState([]);
  const [loadIndex, setloadIndex] = useState(1);

  const [queryParam, setQueryParam] = useState("?");
  const value = { queryParam, setQueryParam };

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/attractions${queryParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // check if page is still mounted and state can be updated
        if (isMounted) {
          setloadIndex(1);
          setPreviewData(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [queryParam]);

  /**
   * Shows the next set of attractions when the load more button is clicked.
   * TODO: https://stackoverflow.com/questions/30253287/lazy-loading-using-nodejs-and-mongodb-as-backend-data
   */
  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
  }

  /**
   * Splits the data into separated arrays so that the load more button can function.
   * @param { Array } data - the fetched data in its form right after request is finished
   * @returns an array of split arrays storing data for each attraction.
   */
  function splitData(data) {
    let splitData = [];
    const size = 8;
    for (let i = 0; i < data.length; i += size) {
      splitData.push(data.slice(i, i + size));
    }
    return splitData;
  }

  function showPreviews() {
    console.log(!!previewData);
    if (previewData) {
      if (previewData.length === 0)
        return <p className="self-center">Nothing Matched!</p>;
      return (
        <div className="grid grid-cols-2">
          {previewData.map((doc) => (
            <Preview data={doc} key={doc.attraction_id} />
          ))}
        </div>
      );
    }
    return null;
  }

  /**
   * TODO: revise conditions after lazy loading is implemented, load more button will like show even at max until then
   * @returns a load more button if all conditions are met, otherwise nothing is returned
   */
  function showLoadMoreButton() {
    return (
      previewData &&
      previewData.length > 1 &&
      loadIndex < previewData.length && (
        <button className="self-center w-[16%]" onClick={handleLoadClick}>
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
          {showPreviews()}
          {showLoadMoreButton()}
        </div>
      </div>
    </div>
  );
}
