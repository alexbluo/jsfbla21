import React, { useContext, useEffect } from "react";
import { FacetsContext } from "./Facets";
import { QueryParamContext } from "../pages/AttractionsPage";
import encodeSpaces from "../utils/encodeSpaces"
import "../css/Checkbox.css";

export default function Checkbox(props) {
  const { facets, setFacets } = useContext(FacetsContext);
  const { queryParam, setQueryParam } = useContext(QueryParamContext);
  const checked = facets[props.category][props.field];

  useEffect(() => {
    const param = `${encodeSpaces(props.field)}=${props.category}`;
    
    if (checked) {
      setQueryParam(queryParam + "&" + param);
    } else {
      setQueryParam(queryParam.replace(param, ""));
    }
  }, [checked]);

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
