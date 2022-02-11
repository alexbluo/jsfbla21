import React, { useState, useContext, } from "react";
import Checkbox from "./Checkbox";
import { FacetsContext } from "./Facets";
import "../css/Dropdown.css";
import dropdownIcon from "../images/dropdownIcon.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { facets, setFacets } = useContext(FacetsContext);

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
        {isOpened && facets[props.category]
          ? Object.keys(facets[props.category]).map((field, index) => (
              <Checkbox category={props.category} field={field} key={index} />
            ))
          : null}
      </ul>
    </div>
  );
}
