import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import Preview from "../components/Preview";

export default function AttractionsView() {
  const [previews, setPreviews] = useState(null, function setPreviews(data) {});

  useEffect(() => {
    fetch("api/attractions")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        let previewElements = [];
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const doc = data[key];
            const previewElement = <Preview details={doc} />;
            previewElements.push(previewElement);
          }
        }
        setPreviews(previewElements);
      })
  }, []);
  for (const key in previews) {
    if (Object.hasOwnProperty.call(previews, key)) {
      const preview = previews[key];
      console.log(preview)
    }
  }
  // const convertPreviewsToElements = () => {
  // let previewElements = [];
  // for (const key in previews) {
  //   if (Object.hasOwnProperty.call(previews, key)) {
  //     const doc = previews[key];
  //     const previewElement = <Preview details={doc} />;
  //     previewElements.push(previewElement);
  //   }
  // }
  // return previewElements;
  // };
  // setPreviews(convertPreviewsToElements());

  return (
    <div>
      <p>Attractions: searchy search here</p>
      <div>{previews}</div>
      <Facets />
    </div>
  );
}
