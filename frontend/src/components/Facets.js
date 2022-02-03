import React, { useEffect, useState, useContext } from "react";
import Dropdown from "./Dropdown";
import { FacetContext } from "../pages/AttractionsPage";
import "../css/Facets.css";

export default function Facets() {
  const { facets, setFacets } = useContext(FacetContext);

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
      <Dropdown category="regions" />
      <Dropdown category="cities" />
      <Dropdown category="types" />
      <Dropdown category="amenities" />
      <button onClick={() => console.log(facets)}></button>
    </div>
  );
}
