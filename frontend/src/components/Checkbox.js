import React, { useState, useContext, useEffect, useCallback } from "react";
import Facets, { FacetsContext } from "./Facets";
import { QueryParamContext } from "../pages/AttractionsPage";
import "../css/Checkbox.css";

export default function Checkbox(props) {
  const { facets, setFacets } = useContext(FacetsContext);
  const { queryParam, setQueryParam } = useContext(QueryParamContext);
  const checked = facets[props.category][props.field];

  useEffect(() => {
    const param = `${encodeSpaces(props.field)}=${props.category}`;
    console.log(param)
    if (facets[props.category][props.field]) {
      setQueryParam(queryParam + "&" + param);
    } else {
      setQueryParam(queryParam.replace(param, ""));
    }
  }, [checked]);

  function encodeSpaces(param) {
    return param.split(" ").join("+");
  }

  function handleCheckedChange() {
    let facetsCopy = { ...facets };
    facetsCopy[props.category][props.field] = !checked;
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
