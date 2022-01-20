import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import "../index.css";

export default function AttractionsView() {
  const [previewsList, setPreviewsList] = useState(null);
  const [previews, setPreviews] = useState(null);
  const [lazyIndex, setLazyIndex] = useState(0);
  // prob need to keep track of facets state here as well

  useEffect(() => {
    fetch("api/attractions")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPreviewsList(splitData(data));
        setPreviews(renderPreviewsElements(previewsList[0]));
      });
  }, []);

  function handleLazyLoadClick() {
    setPreviews(renderPreviewsElements(previewsList[0]));
    setLazyIndex(lazyIndex + 1);
    // setPreviews([...previews, renderPreviewsElements(lazyIndex)]);
  }

  function splitData(data) {
    let splitData = [];
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    for (let i = 0; i < data.length; i++) {
      if (i % 8 === 0) {
        splitData.push(data.slice(i));
      }
    }
    return splitData;
  }

  function renderPreviewsElements(data) {
    let previewElements = [];
    for (const key in data) {
      const doc = data[key];
      const previewElement = <Preview data={doc} key={doc.attraction_id} />;
      previewElements.push(previewElement);
    }
    return previewElements;
  }

  return (
    <div>
      <p>Attractions: searchy search here</p>
      <div className="grid">
        <div className="previewsContainer">{previews}</div>

        <button onClick={handleLazyLoadClick}>LOAD MORE</button>
        <Facets />
      </div>
    </div>
  );
}
