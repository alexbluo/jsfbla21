import React, { useState, useContext, useEffect } from "react";
import Facets, { FacetsContext } from "./Facets";
import { QueryParamContext } from "../pages/AttractionsPage";
import "../css/Checkbox.css"

export default function Checkbox(props) {
  const { facets, setFacets } = useContext(FacetsContext);
  const { queryParam, setQueryParam } = useContext(QueryParamContext);
  const checked = facets[props.category][props.field];

  // useCallback or something to set/update queryParam on facets change

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
