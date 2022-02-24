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
  const [previewData, setPreviewList] = useState([]);
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
      .then((data) => splitData(data)) // split the data into separate arrays for loading
      .then((data) => {
        // check if page is still mounted and state can be updated
        if (isMounted) {
          setloadIndex(1);
          // data returned from backend will be [] if no attractions match the filters
          if (data.length === 0) {
            setPreviewElements(<p>Nothing Matched!</p>);
          } else {
            setPreviewElements(renderPreviewElements(data[0]));
          }
          setPreviewList(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [queryParam]);

  /**
   * Shows the next set of attractions when the load more button is clicked.
   */
  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviewElements((prev) => [
      ...prev,
      ...renderPreviewElements(previewData[loadIndex]),
    ]);
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

  /**
   * Tranforms preview data into elements.
   * @param { Array } data - a chunk of data to be rendered
   * @returns HTML preview elements
   */
  function renderPreviewElements(data) {
    let previewElements = [];
    for (const doc of data) {
      const previewElement = <Preview data={doc} key={doc.attraction_id} />;
      previewElements.push(previewElement);
    }
    return previewElements;
  }

  return (
    <div className="container px-[8%]">
      <NavBar />
      <h1 className="text-4xl">Attractions</h1>
      <QueryParamContext.Provider value={value}>
        <Facets />
      </QueryParamContext.Provider>
      <div className="">
        <div className="">{previewElements}</div>
        {previewData.length > 1 && loadIndex < previewData.length && (
          <button className="" onClick={handleLoadClick}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
