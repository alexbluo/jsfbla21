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
  const [previewList, setPreviewList] = useState([]);
  const [previewElements, setPreviewElements] = useState([]);
  const [loadIndex, setloadIndex] = useState(1);

  const [queryParam, setQueryParam] = useState("");
  const value = { queryParam, setQueryParam };

  useEffect(() => {
    fetch(`api/attractions?${queryParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => splitData(data))
      .then((data) => {
        setloadIndex(1);
        if (data == []) {
          setPreviewList(null);
          setPreviewElements(<p>Nothing Matched!</p>);
        } else {
          setPreviewList(data);
          setPreviewElements(renderPreviewElements(data[0]));
        }
      });
  }, [queryParam]);

  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviewElements((prev) => [
      ...prev,
      ...renderPreviewElements(previewList[loadIndex]),
    ]);
  }

  function splitData(data) {
    let splitData = [];
    let size = 8;
    for (let i = 0; i < data.length; i += size) {
      splitData.push(data.slice(i, i + size));
    }
    return splitData;
  }

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
    return previewList != null &&
      previewList.length > 1 &&
      loadIndex < previewList.length ? (
      <button id="AttractionsPage__button" onClick={handleLoadClick}>
        LOAD MORE
      </button>
    ) : null;
  }

  return (
    <div className="AttractionsPage container">
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
