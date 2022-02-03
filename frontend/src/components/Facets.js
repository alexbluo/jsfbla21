import React, { useEffect, useState, useContext } from "react";
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
    fetchFacets("regions");
    fetchFacets("cities");
    fetchFacets("types");
    fetchFacets("amenities");
  }, []);

  function fetchFacets(category) {
    fetch(`/api/facets/${category}`)
      .then((data) => data.json())
      .then((data) => {
        let facetsCopy = facets;
        facetsCopy[category] = data[category].reduce(
          (acc, curr) => ((acc[curr] = false), acc),
          {}
        );
        setFacets(facetsCopy);
      });
  }

  return (
    <div className="Facets">
      <FacetsContext.Provider value={value}>
        <Dropdown category="regions" />
        <Dropdown category="cities" />
        <Dropdown category="types" />
        <Dropdown category="amenities" />
      </FacetsContext.Provider>
      <button onClick={() => console.log(facets)}></button>
    </div>
  );
}
