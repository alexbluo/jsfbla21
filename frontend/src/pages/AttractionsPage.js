import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";
import "../css/AttractionsPage.css";

export default function AttractionsPage() {
  const [previewList, setPreviewList] = useState(null);
  const [previewElements, setPreviewElements] = useState([]);
  const [loadIndex, setloadIndex] = useState(150);
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    fetch(`api/attractions?${queryParams}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => splitData(data))
      .then((data) => {
        if (data == null) {
          setPreviewList(null);
          setPreviewElements(<p>Nothing Matched!</p>);
        } else {
          setPreviewList(data);
          setPreviewElements(renderPreviewElements(data[0]));
        }
      });
  }, [queryParams]);

  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviewElements((prev) => [
      ...prev,
      ...renderPreviewElements(previewList[loadIndex]),
    ]);
    console.log(loadIndex);
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

  function showLoadMoreButton() {
    return previewList != null && previewList.length > 8 && loadIndex < previewList.length ? (
      <button id="AttractionsPage__button" onClick={handleLoadClick}>
        LOAD MORE
      </button>
    ) : null;
  }

  return (
    <div className="AttractionsPage container">
      <NavBar />
      <h1>Attractions</h1>
      <Facets className="Dropdown__container" />
      <div className="grid-container">
        <div className="grid">{previewElements}</div>
        {showLoadMoreButton()}
      </div>
    </div>
  );
}
