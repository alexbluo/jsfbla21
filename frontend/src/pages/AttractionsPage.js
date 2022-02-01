import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";
import "../css/AttractionsPage.css";

export default function AttractionsPage() {
  const [previewsList, setPreviewsList] = useState(null);
  const [previews, setPreviews] = useState([]);
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
          setPreviewsList(null);
          setPreviews(<p>Nothing Matched!</p>);
        } else {
          setPreviewsList(data);
          setPreviews(renderPreviewsElements(data[0]));
        }
      });
  }, [queryParams]);

  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviews((prev) => [
      ...prev,
      ...renderPreviewsElements(previewsList[loadIndex]),
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

  function renderPreviewsElements(data) {
    let previewElements = [];
    for (const doc of data) {
      const previewElement = <Preview data={doc} key={doc.attraction_id} />;
      previewElements.push(previewElement);
    }
    return previewElements;
  }

  function showLoadMoreButton() {
    return previewsList != null && previewsList.length > 8 && loadIndex < previewsList.length ? (
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
        <div className="grid">{previews}</div>
        {showLoadMoreButton()}
      </div>
    </div>
  );
}
