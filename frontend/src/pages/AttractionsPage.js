import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";
import "../css/AttractionsPage.css";

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
   * Shows the next set of attractions when the load more button is clicked
   */
  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviewElements((prev) => [
      ...prev,
      ...renderPreviewElements(previewData[loadIndex]),
    ]);
  }

  /**
   *
   * @param { Array } data
   * @returns
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
   *
   * @param { Array } data
   * @returns
   */
  function renderPreviewElements(data) {
    let previewElements = [];
    for (const doc of data) {
      const previewElement = <Preview data={doc} key={doc.attraction_id} />;
      previewElements.push(previewElement);
    }
    return previewElements;
  }

  /**
   * Determines whether a load more button for previews should be rendered
   * @returns a load more button if the conditions are satisfied and nothing if they are not
   */
  function showLoadMoreButton() {
    return (
      previewData.length > 1 &&
      loadIndex < previewData.length && (
        <button id="AttractionsPage__button" onClick={handleLoadClick}>
          LOAD MORE
        </button>
      )
    );
  }

  return (
    <div className="AttractionsPage container">
      <h2 className="text-3xl font-bold underline">TESTING</h2>
      <NavBar />
      <h1>Attractions</h1>
      <QueryParamContext.Provider value={value}>
        <Facets className="Dropdown__container" />
      </QueryParamContext.Provider>
      <div className="grid-container">
        <div className="grid">{previewElements}</div>
        {showLoadMoreButton()}
      </div>
    </div>
  );
}
