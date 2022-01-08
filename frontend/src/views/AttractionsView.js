import React, { useState, useEffect } from "react";
import Facets from "../components/Facets";

export default function AttractionsView() {
  const [data, setData] = useState(null, (newData) => data = newData);

  useEffect(() => {
    fetch("api/attractions")
      .then((res) => res.json())
      .then((data) => JSON.stringify(data))
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <p>Attractions: searchy search here {data}</p>
      <Facets />
    </div>
  );
}
