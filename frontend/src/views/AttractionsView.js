import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import "../index.css"

export default function AttractionsView() {
  const [previews, setPreviews] = useState(null);
  const [lazyIndex, setLazyIndex] = useState(null)

  useEffect(() => {
    fetch("api/attractions")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPreviews(renderPreviewsElements(data))
      });
  }, []);

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
        {previews}
        <Facets />
      </div>
    </div>
  );
}
