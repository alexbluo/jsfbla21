import React, { useState, useContext } from "react";
import { FacetContext } from "../pages/AttractionsPage";
import "../css/Checkbox.css"

export default function Checkbox(props) {
  const [checked, setChecked] = useState(false);
  const { facets, setFacets } = useContext(FacetContext);

  return (
    <li className="Checkbox">
      <label>
        <input type="checkbox" onInput={() => setChecked(!checked)} />
        {props.field}
      </label>
    </li>
  );
}
