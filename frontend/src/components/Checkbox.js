import React, { useState, useContext, useEffect } from "react";
import { FacetContext } from "../pages/AttractionsPage";
import "../css/Checkbox.css"

export default function Checkbox(props) {
  const { facets, setFacets } = useContext(FacetContext);
  const checked = facets[props.category][props.field];

  const handleCheckedChange = () => {
    let facetsCopy = { ...facets }
    facetsCopy[props.category][props.field] =
      !checked;
    setFacets(facetsCopy);
  }

  return (
    <li className="Checkbox">
      <label>
        <input
          type="checkbox"
          onChange={handleCheckedChange}
          checked={checked}
        />
        {props.field}
      </label>
    </li>
  );
}
