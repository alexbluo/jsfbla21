import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { FacetContext } from "../pages/AttractionsPage";
import "../css/Facets.css";

export default function Facets() {
  // use closure to pass state to view?
  // look at react lifting state up guide
  // function updateFilters() {}
  // const { facets, setFacets } = useContext(FacetContext);

  return (
    <div className="Facets">
      <Dropdown category="regions" />
      <Dropdown category="cities" />
      <Dropdown category="types" />
      <Dropdown category="amenities" />
    </div>
  );
}
