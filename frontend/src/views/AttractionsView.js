import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import AttractionPreview from "../components/AttractionPreview";

export default function AttractionsView() {
  const [previews, setPreviews] = useState(null);
  // let previews;

  useEffect(() => {
    fetch("api/attractions")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json()
      })
      .then((data) => console.log(data));
  }, []);

  // attractionsToPreview.forEach(doc => {
  //   console.log(doc)
  //   previews.push(
  //     <AttractionPreview details={doc} />
  //   )
  // });

  return (
    <div>
      <p>Attractions: searchy search here</p>
      <div>{previews}</div>
      <Facets />
    </div>
  );
}
