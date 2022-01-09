import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";
import AttractionPreview from "../components/AttractionPreview"

export default function AttractionsView() {
  const [attractionsToPreview, setAttractionsToPreview] = useState(null);
  let previews;

  useEffect(() => {
    fetch("api/attractions")
      .then((docs) => setAttractionsToPreview(docs))
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
