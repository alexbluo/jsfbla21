import React, { useEffect, useState, useContext, useCallback } from "react";
import Checkbox from "./Checkbox";
import { FacetContext } from "../pages/AttractionsPage";
import "../css/Dropdown.css";
import dropdownIcon from "../images/dropdownIcon.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { facets, setFacets } = useContext(FacetContext);

  return (
    <div>
      <h2 className="Dropdown__title">
        {props.category.toUpperCase()}
        <input
          type="image"
          src={dropdownIcon}
          alt=""
          onClick={() => setIsOpened(!isOpened)}
          className="Dropdown__icon"
        />
      </h2>
      <ul className="Dropdown__contents">
        {isOpened
          ? facets[props.category].keys().map((field, index) => <Checkbox field={field} key={index} />)
          : null}
      </ul>
    </div>
  );
}
