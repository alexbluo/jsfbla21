import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";
import NavBar from "../components/NavBar";
import "../css/AttractionsPage.css"

// ERRORS:
// click before loaded (if res.loading or something like that)
// around index 150: GET 503 https://www.visitmaryland.org/sites/default/files/styles/listing_slideshow_md/public/listing_images/profile/2933/0-8936-destination-2933.jpg?itok=RE1Ja262
// whatever load error when maxed - around index 150: Each child in a list should have a unique "key" prop.
// "Indicate whether to send a cookie in a cross-site request by specifying its SameSite attribute"

export default function AttractionsPage() {
  const [previewsList, setPreviewsList] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [loadIndex, setloadIndex] = useState(1);
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
        setPreviewsList(data);
        setPreviews(renderPreviewsElements(data[0]));
      });
  }, [queryParams]);

  function handleLoadClick() {
    setloadIndex(loadIndex + 1);
    setPreviews((prev) => [
      ...prev,
      ...renderPreviewsElements(previewsList[loadIndex]),
      loadIndex + 1 < previewsList.length ? (
        <button id="AttractionsPage__button" onClick={handleLoadClick}>
          LOAD MORE
        </button>
      ) : null,
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
    <div>
      <NavBar />
      <h1>Attractions</h1>
      <div className="grid">
        <div>{previews}</div>

        {/* handle when theres no more to load, should be simple*/}
        {
          // <button id="AttractionsPage__button" onClick={handleLoadClick}>
          //   LOAD MORE
          // </button>
        }
        <Facets className="Dropdown__container" />
      </div>
    </div>
  );
}
