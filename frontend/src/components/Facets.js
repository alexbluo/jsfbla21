import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown"
import "../css/Facets.css";

export default function Facets() {
  // use closure to pass state to view?
  // look at react lifting state up guide
  // function updateFilters() {}

  return (
    <div className="Facets">
      <Dropdown category="Region" />
      <Dropdown category="City" />
      <Dropdown category="Type" />
      <Dropdown category="Amenities" />
    </div>
  );
}
