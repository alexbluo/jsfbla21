import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";
import "../css/AttractionsPage.css";

// ERRORS:
// click before loaded (if res.loading or something like that)
// whatever load error when maxed - around index 150: Each child in a list should have a unique "key" prop.
// "Indicate whether to send a cookie in a cross-site request by specifying its SameSite attribute" (exactly 56 appear with each load)
// dropdown images go over navbar LOL

export default function AttractionsPage() {
  const [previewsList, setPreviewsList] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [loadIndex, setloadIndex] = useState(150);
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    fetch(`api/attractions?test=1${queryParams}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => splitData(data))
      .then((data) => {
        setPreviewsList(data);
        setPreviews(renderPreviewsElements(data[0]));
      });
  }, [queryParams]);

  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviews((prev) => [
      ...prev,
      ...renderPreviewsElements(previewsList[loadIndex]),
    ]);
    console.log(previewsList.length);
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
    if (data == null) return [<div>Nothing Matched</div>];

    let previewElements = [];
    for (const idx in data) {
      const doc = data[idx];
      const previewElement = (
        <Preview
          data={doc}
          col_id={idx % 2 === 0 ? 1 : 2}
          key={doc.attraction_id}
        />
      );
      previewElements.push(previewElement);
    }
    return previewElements;
  }

  return (
    <div className="AttractionsPage">
      <NavBar />
      <h1>Attractions</h1>
      <div className="grid">
        <Facets className="Dropdown__container" />
        {previews}

        {/* handle when theres no more to load, should be simple*/}
        <button id="AttractionsPage__button" onClick={handleLoadClick}>
          LOAD MORE
        </button>
        
      </div>
    </div>
  );
}
