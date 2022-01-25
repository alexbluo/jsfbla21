import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";
import "../index.css";

export default function AttractionsPage() {
  const [previewsList, setPreviewsList] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [loadIndex, setloadIndex] = useState(1);
  // prob need to keep track of facets state here as well

  useEffect(() => {
    fetch("api/attractions")
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
  }, []);

  // this might not work.
  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviews((prev) => [
      ...prev,
      ...renderPreviewsElements(previewsList[loadIndex]),
    ]);
    console.log(previews);
  }

  // this works.
  function splitData(data) {
    let splitData = [];
    let size = 8;
    for (let i = 0; i < data.length; i += size) {
      splitData.push(data.slice(i, i + size));
    }
    return splitData;
  }

  // this could be better
  function renderPreviewsElements(data) {
    if (data == null) return [<p>nothing matched</p>];

    let previewElements = [];
    for (const doc of data) {
      // could separate into columns using index here but i dont like that
      // const doc = data[key];
      const previewElement = <Preview data={doc} key={doc.attraction_id} />;
      previewElements.push(previewElement);
    }
    return previewElements;
  }

  return (
    <div className="container">
      <NavBar />
      <h1>Attractions</h1>
      <div className="grid">
        <div className="Preview">{previews}</div>

        {/* handle when theres no more to load, should be simple*/}
        {<button id="AttractionsPage__button" onClick={handleLoadClick}>LOAD MORE</button>}
        <Facets className="Dropdown__container" />
      </div>
    </div>
  );
}
