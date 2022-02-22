import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import "../css/Facets.css";

export const FacetsContext = React.createContext({
  facets: {},
  setFacets: () => {},
});

export default function Facets() {
  const [facets, setFacets] = useState({});
  const value = { facets, setFacets };

  useEffect(() => {
    fetchFacets("region");
    fetchFacets("city");
    fetchFacets("category");
    fetchFacets("amenity");

    function fetchFacets(category) {
      fetch(`/api/facets/${category}`)
        .then((data) => data.json())
        .then((data) => {
          let facetsCopy = facets;
          facetsCopy[category] = data[category].reduce(
            // eslint-disable-next-line no-sequences
            (acc, curr) => ((acc[curr] = false), acc),
            {}
          );
          setFacets(facetsCopy);
        });
    }
  }, [facets]);

  return (
    <div className="Facets">
      <FacetsContext.Provider value={value}>
        <Dropdown category="region" />
        <Dropdown category="city" />
        <Dropdown category="category" />
        <Dropdown category="amenity" />
      </FacetsContext.Provider>
    </div>
  );
}
